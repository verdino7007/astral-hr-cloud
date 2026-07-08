from fastapi import FastAPI, Depends, HTTPException, Header, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import os
import sys
import hashlib
import secrets
from datetime import datetime
from typing import List

# Add modules directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'modules'))

from bazi_engine import analyze_bazi
from primbon_engine import analyze_primbon
from falakiyah_engine import analyze_falakiyah

from database import engine, Base, get_db
import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Astral HR Intelligence API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing utilities
def hash_password(password: str) -> str:
    salt = secrets.token_hex(8)
    hashed = hashlib.sha256((password + salt).encode('utf-8')).hexdigest()
    return f"{salt}:{hashed}"

def verify_password(password: str, hashed_str: str) -> bool:
    if not hashed_str or ":" not in hashed_str:
        return False
    salt, hashed = hashed_str.split(":", 1)
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest() == hashed

# Pydantic schemas for Auth
class UserSignup(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class CandidateCreate(BaseModel):
    name: str
    birth_date: str  # YYYY-MM-DD
    birth_time: str = "12:00"  # HH:MM

class CandidateUpdate(BaseModel):
    name: str
    birth_date: str
    birth_time: str = "12:00"

# Dependency to retrieve current authenticated user
def get_current_user(authorization: str = Header(None), db: Session = Depends(get_db)):
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing"
        )
    token = authorization
    if authorization.startswith("Bearer "):
        token = authorization[7:]
        
    user = db.query(models.User).filter(models.User.token == token).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid credentials"
        )
    return user

# Authentication Endpoints
@app.post("/auth/signup")
def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already registered in agency archives"
        )
        
    hashed = hash_password(user_data.password)
    token = secrets.token_hex(16)
    
    new_user = models.User(
        username=user_data.username,
        hashed_password=hashed,
        token=token
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Backward compatibility migration:
    # If this is the FIRST user, associate any legacy unowned candidates to them!
    user_count = db.query(models.User).count()
    if user_count == 1:
        db.query(models.Candidate).filter(models.Candidate.user_id == None).update(
            {models.Candidate.user_id: new_user.id},
            synchronize_session=False
        )
        db.commit()
        
    return {
        "status": "registered",
        "username": new_user.username,
        "token": new_user.token
    }

@app.post("/auth/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == user_data.username).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail="Invalid agency credentials"
        )
        
    # Generate new token on login
    new_token = secrets.token_hex(16)
    user.token = new_token
    db.commit()
    db.refresh(user)
    
    return {
        "status": "authenticated",
        "username": user.username,
        "token": user.token
    }

def synthesize_analysis(bazi, primbon, falakiyah):
    bazi_dm = bazi.get("day_master", "")
    dm_char = ""
    dm_element = ""
    if isinstance(bazi_dm, dict):
        dm_char = bazi_dm.get("character", "")
        dm_element = bazi_dm.get("element", "")
        bazi_day_master = f"'{dm_char}' ({bazi_dm.get('pinyin', '')} - {bazi_dm.get('translation', '')})"
    else:
        dm_char = str(bazi_dm)
        bazi_day_master = dm_char
        
    primbon_char = primbon.get("character", "")
    falakiyah_element = falakiyah.get("numerology", {}).get("element", "")
    
    # Paragraf 1: Core Identity (BaZi x Falakiyah)
    p1 = f"**Core Identity & Cosmic Drive**\nKandidat ini membawa perpaduan energi bawaan {bazi_day_master} (BaZi) yang berjalan beriringan dengan vibrasi alamiah {falakiyah_element} (Falakiyah). "
    if "Api" in falakiyah_element or dm_element == "Fire" or "Fire" in dm_char:
        p1 += "Kombinasi ini melahirkan profil individu dengan dorongan eksekusi yang meledak-ledak dan antusiasme tinggi. Mereka cenderung menjadi inisiator yang berani mengambil risiko dan mampu memanaskan semangat tim di sekitarnya."
    elif "Air" in falakiyah_element or dm_element == "Water" or "Water" in dm_char:
        p1 += "Konfigurasi ini membentuk kepribadian yang sangat mengalir, empatik, dan memiliki kedalaman intuisi. Layaknya air yang mampu menyesuaikan diri dengan wadahnya, individu ini memiliki resiliensi tinggi dalam menghadapi perubahan lingkungan."
    elif "Udara" in falakiyah_element or dm_element == "Metal" or "Metal" in dm_char:
        p1 += "Karakteristik ini menajamkan kemampuan analitis, komunikasi strategis, dan kebebasan berpikir. Individu ini cenderung mengandalkan logika yang tajam dan visi jangka panjang, menjadikannya perencana yang visioner."
    elif "Tanah" in falakiyah_element or dm_element == "Earth" or "Earth" in dm_char:
        p1 += "Pola ini membumikan karakter mereka menjadi sosok yang sangat rasional, stabil, dan berorientasi pada hasil nyata (material). Stabilitas dan loyalitas adalah pilar utama dari fondasi psikologis mereka."
    else:
        p1 += "Interaksi kedua energi ini menciptakan ekuilibrium yang unik, di mana logika dan intuisi bekerja secara bergantian merespons tantangan."
    
    # Paragraf 2: Destiny & Work Style (Primbon)
    p2 = f"**Manifestation of Destiny**\nSecara siklikal menurut Primbon Jawa, pola energi tersebut mengerucut pada takdir bawaan sebagai '{primbon_char}'. "
    p2 += "Ini berarti, dorongan energi dari elemen inti tadi akan termanifestasi paling optimal ketika mereka berada dalam posisi atau peran yang sesuai dengan watak takdir tersebut. Siklus hidup mereka secara konsisten akan menarik mereka kembali pada pola kerja dan penyelesaian masalah yang mengandalkan kelebihan karakter ini."
    
    # Paragraf 3: HR Recommendations
    p3 = "**Managerial Recommendation**\nUntuk memaksimalkan potensi kandidat, HRD disarankan untuk "
    if "Api" in falakiyah_element or dm_element == "Fire" or "Fire" in dm_char:
        p3 += "memberikan mereka otonomi dalam mengeksekusi ide dan memimpin proyek jangka pendek. Hindari lingkungan yang terlalu birokratis karena dapat memadamkan semangat inovasi mereka."
    elif "Air" in falakiyah_element or dm_element == "Water" or "Water" in dm_char:
        p3 += "menempatkan mereka dalam peran yang membutuhkan mediasi, negosiasi, atau pelayanan. Mereka membutuhkan lingkungan kerja yang harmonis dan rentan terhadap gaya kepemimpinan yang terlalu konfrontatif."
    elif "Udara" in falakiyah_element or dm_element == "Metal" or "Metal" in dm_char:
        p3 += "melibatkan mereka dalam fase perumusan strategi dan analisis data. Mereka sangat menghargai kebebasan intelektual dan akan frustrasi jika terjebak dalam rutinitas administratif yang repetitif."
    else:
        p3 += "memercayakan mereka pada tugas-tugas yang membutuhkan ketekunan, pengelolaan aset, atau operasional jangka panjang. Berikan mereka kepastian dan metrik yang jelas, maka mereka akan menjadi tulang punggung operasional yang paling dapat diandalkan."
        
    return f"{p1}\n\n{p2}\n\n{p3}"

def _run_analysis(name: str, birth_date: str, birth_time: str):
    # Parse Dates
    dt = datetime.strptime(f"{birth_date} {birth_time}", "%Y-%m-%d %H:%M")
    year, month, day, hour = dt.year, dt.month, dt.day, dt.hour
    
    # 1. BaZi Engine
    bazi_results = analyze_bazi(year, month, day, hour)
    
    # 2. Primbon Engine
    primbon_results = analyze_primbon(year, month, day)
    
    # 3. Falakiyah Engine (Now passing name for Hisab Jummal)
    falakiyah_results = analyze_falakiyah(name, year, month, day, hour)
    
    # 4. Aggregated Team Synergy
    synergy_score = 75
    if "Wood" in bazi_results["elements"] and bazi_results["elements"]["Wood"] > 30:
        synergy_score += 5
    if primbon_results["neptu_score"] % 2 == 0:
        synergy_score += 10
        
    overall_score = min(synergy_score, 100)
    
    # 5. Holistic Synthesis
    synthesis = synthesize_analysis(bazi_results, primbon_results, falakiyah_results)
    
    return {
        "bazi": bazi_results,
        "primbon": primbon_results,
        "falakiyah": falakiyah_results,
        "synthesis": synthesis
    }, overall_score


@app.post("/analyze")
def analyze_candidate(candidate: CandidateCreate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        results, overall_score = _run_analysis(candidate.name, candidate.birth_date, candidate.birth_time)
        
        # Save to DB
        db_candidate = models.Candidate(
            name=candidate.name,
            birth_date=candidate.birth_date,
            birth_time=candidate.birth_time,
            overall_score=overall_score,
            analysis_data=results,
            user_id=current_user.id
        )
        db.add(db_candidate)
        db.commit()
        db.refresh(db_candidate)
        
        return {
            "id": db_candidate.id,
            "name": db_candidate.name,
            "overall_score": db_candidate.overall_score,
            "results": db_candidate.analysis_data
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/candidates")
def get_candidates(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Candidate).filter(models.Candidate.user_id == current_user.id).all()

@app.put("/candidates/{candidate_id}")
def update_candidate(candidate_id: int, candidate: CandidateUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id,
        models.Candidate.user_id == current_user.id
    ).first()
    if not db_candidate:
        raise HTTPException(status_code=404, detail="Candidate not found or unauthorized")
        
    try:
        results, overall_score = _run_analysis(candidate.name, candidate.birth_date, candidate.birth_time)
        db_candidate.name = candidate.name
        db_candidate.birth_date = candidate.birth_date
        db_candidate.birth_time = candidate.birth_time
        db_candidate.overall_score = overall_score
        db_candidate.analysis_data = results
        db.commit()
        db.refresh(db_candidate)
        return {"status": "success", "candidate": db_candidate}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/candidates/{candidate_id}")
def delete_candidate(candidate_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id,
        models.Candidate.user_id == current_user.id
    ).first()
    if not db_candidate:
        raise HTTPException(status_code=404, detail="Candidate not found or unauthorized")
    db.delete(db_candidate)
    db.commit()
    return {"status": "deleted"}

class SynergyRequest(BaseModel):
    candidate_ids: List[int]

@app.post("/synergy")
def calculate_team_synergy(req: SynergyRequest, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    candidates = db.query(models.Candidate).filter(
        models.Candidate.id.in_(req.candidate_ids),
        models.Candidate.user_id == current_user.id
    ).all()
    if len(candidates) < len(req.candidate_ids):
        raise HTTPException(status_code=403, detail="Unauthorized access to one or more candidates")
    if len(candidates) < 2:
        return {"error": "Need at least 2 candidates"}
        
    total_wood = sum(c.analysis_data["bazi"]["elements"].get("Wood", 0) for c in candidates)
    total_water = sum(c.analysis_data["bazi"]["elements"].get("Water", 0) for c in candidates)
    total_fire = sum(c.analysis_data["bazi"]["elements"].get("Fire", 0) for c in candidates)
    
    # Falakiyah Elements
    elements = [c.analysis_data["falakiyah"].get("numerology", {}).get("element", "") for c in candidates]
    has_api = "Api" in elements
    has_air = "Air" in elements
    has_tanah = "Tanah" in elements
    has_udara = "Udara / Angin" in elements
    
    # Example logic: Water + Wood is good, Fire + Water is clash
    synergy_score = 70
    details = []
    
    if total_water > 0 and total_wood > 0:
        synergy_score += 10
        
    if has_api and has_air:
        synergy_score -= 15
        details.append("Clash: Elemen Api dan Air dalam tim (potensi konflik eksekusi vs emosi).")
    
    if has_api and has_udara:
        synergy_score += 15
        details.append("Harmoni: Api dan Udara (ide cemerlang dieksekusi dengan semangat tinggi).")
        
    if has_tanah and has_air:
        synergy_score += 15
        details.append("Harmoni: Tanah dan Air (solid, saling melengkapi dan menyuburkan).")
        
    if not details:
        details.append("Kombinasi energi esoterik dalam tim cukup stabil.")
        
    return {
        "team_size": len(candidates),
        "team_synergy_score": min(max(synergy_score, 0), 100),
        "details": " ".join(details)
    }

@app.get("/")
def read_root():
    return {"status": "online", "message": "Astral HR Engine is ready"}
