import ephem
from datetime import datetime
import re

def calculate_abjad(name):
    # Standard Abjadiyah values
    abjad_values = {
        'A': 1, 'B': 2, 'C': 3, 'J': 3, 'D': 4, 'E': 5, 'H': 5, 
        'U': 6, 'V': 6, 'W': 6, 'Z': 7, 'T': 9, 'I': 10, 'Y': 10,
        'K': 20, 'L': 30, 'M': 40, 'N': 50, 'S': 60, 'X': 60,
        'O': 70, 'F': 80, 'P': 80, 'Q': 100, 'R': 200, 'G': 1000
    }
    
    # Clean name (remove non-alphabets)
    clean_name = re.sub(r'[^A-Z]', '', name.upper())
    total_weight = sum(abjad_values.get(char, 0) for char in clean_name)
    
    # Determine element based on modulo 4
    remainder = total_weight % 4
    if remainder == 1:
        element = "Api"
        jobs = "Dinamis & Kepemimpinan (Sales, Marketing, Manager, Motivator, Public Relations)"
        team_match = "Cocok berpasangan dengan Udara (angin membesarkan api). Cenderung bentrok jika digabung dengan Air."
        icon = "🔥"
    elif remainder == 2:
        element = "Udara / Angin"
        jobs = "Analitis & Komunikasi (Data Analyst, Strategist, Konsultan, Penulis, Negosiator)"
        team_match = "Cocok dengan Api dan Air. Sangat adaptif dalam tim. Kurang cocok dengan Tanah (debu beterbangan)."
        icon = "💨"
    elif remainder == 3:
        element = "Air"
        jobs = "Empati & Perawatan (HRD, Counseling, Perawat, Pelayanan Pelanggan, Guru)"
        team_match = "Cocok berpasangan dengan Tanah (menyuburkan) dan Udara. Sangat bentrok dengan dominasi Api."
        icon = "💧"
    else: # remainder == 0
        element = "Tanah"
        jobs = "Struktural & Stabil (Admin, Finance, Akuntan, Operasional, Konstruksi, IT Backend)"
        team_match = "Sangat solid bekerja dengan Air dan Api. Cenderung terlalu kaku jika berhadapan dengan inovator berunsur Udara."
        icon = "🌍"
        
    return {
        "weight": total_weight,
        "element": element,
        "icon": icon,
        "suitable_jobs": jobs,
        "team_compatibility": team_match
    }

def analyze_falakiyah(name, year, month, day, hour=12):
    # Set up the observer (defaulting to Jakarta/Mecca relative for general spiritual astrology)
    obs = ephem.Observer()
    obs.date = datetime(year, month, day, hour)
    obs.lat = '-6.2088' # Jakarta
    obs.lon = '106.8456'
    
    sun = ephem.Sun(obs)
    moon = ephem.Moon(obs)
    mars = ephem.Mars(obs)
    venus = ephem.Venus(obs)
    jupiter = ephem.Jupiter(obs)
    saturn = ephem.Saturn(obs)
    
    # Zodiac boundaries (approximate sidereal/tropical based on ephem constellations)
    # Using simple ecliptic longitude for tropical signs
    def get_zodiac_sign(lon):
        degrees = lon * 180 / ephem.pi
        signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
        return signs[int(degrees / 30) % 12]

    # Calculate ecliptic longitudes
    sun_eq = ephem.Equatorial(sun.ra, sun.dec, epoch=obs.date)
    sun_ecl = ephem.Ecliptic(sun_eq)
    
    moon_eq = ephem.Equatorial(moon.ra, moon.dec, epoch=obs.date)
    moon_ecl = ephem.Ecliptic(moon_eq)
    
    sun_sign = get_zodiac_sign(sun_ecl.lon)
    moon_sign = get_zodiac_sign(moon_ecl.lon)
    
    lunar_phase = moon.phase # percentage illumination
    
    abjad_data = calculate_abjad(name)
    
    return {
        "sun_sign": sun_sign,
        "moon_sign": moon_sign,
        "lunar_illumination": f"{lunar_phase:.1f}%",
        "planetary_positions": {
            "Sun": str(ephem.constellation(sun)[1]),
            "Moon": str(ephem.constellation(moon)[1]),
            "Mars": str(ephem.constellation(mars)[1]),
            "Venus": str(ephem.constellation(venus)[1]),
            "Jupiter": str(ephem.constellation(jupiter)[1]),
            "Saturn": str(ephem.constellation(saturn)[1]),
        },
        "hr_insight": f"Sun in {sun_sign} provides core identity, while Moon in {moon_sign} drives emotional intelligence.",
        "numerology": abjad_data
    }
