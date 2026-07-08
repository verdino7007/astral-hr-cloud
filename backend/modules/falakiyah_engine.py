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
    
    # Clean name
    clean_name = re.sub(r'[^A-Z]', '', name.upper())
    
    # Build math string
    calc_parts = []
    total_weight = 0
    for char in clean_name:
        val = abjad_values.get(char, 0)
        if val > 0:
            calc_parts.append(f"{char}({val})")
            total_weight += val
            
    calc_string = " + ".join(calc_parts) + f" = {total_weight}"
    
    # Shams al-Ma'arif Digital Root (Modulo 9, 0->9)
    remainder = total_weight % 9
    if remainder == 0:
        remainder = 9
        
    modulo_string = f"{total_weight} mod 9 = {remainder}"
    
    # Map to Planetary Wafq / Cosmology
    asmaul_husna = ""
    if remainder == 1:
        element = "Al-Qalam (The Pen) / Sun"
        jobs = "Visionary Leadership, Founder, CEO"
        team_match = "Independent, needs strong executors (Saturn/Mars) to ground ideas."
        icon = "☀️"
        asmaul_husna = "Ya Ahad, Ya Wahid (For singular focus & divine connection)"
    elif remainder == 2:
        element = "Al-Lawh (The Tablet) / Moon"
        jobs = "Counseling, HR, Archival, Deep Support"
        team_match = "Excellent listener. Works well with expressive Mercury or authoritative Sun."
        icon = "🌙"
        asmaul_husna = "Ya Sami', Ya Basir (For emotional intelligence & perception)"
    elif remainder == 3:
        element = "Saturn (Wafq 3x3)"
        jobs = "Structural, Admin, QA, Discipline, Risk Management"
        team_match = "Provides boundaries. Clashes with unpredictable Uranus/Mars."
        icon = "🪐"
        asmaul_husna = "Ya Qahhar, Ya Mani' (For discipline & preventing chaos)"
    elif remainder == 4:
        element = "Jupiter (Wafq 4x4)"
        jobs = "Expansion, Strategy, Mentorship, Law"
        team_match = "Growth-oriented. Excellent pairing with Venus for harmonious culture."
        icon = "🌌"
        asmaul_husna = "Ya Razzaq, Ya Fattah (For abundance & opening doors)"
    elif remainder == 5:
        element = "Mars (Wafq 5x5)"
        jobs = "Crisis Management, Action, Sales, Pioneering"
        team_match = "Highly driven. Needs Venus to soften edges or Saturn for direction."
        icon = "🔴"
        asmaul_husna = "Ya Qawiy, Ya Matin (For strength & unshakeable resolve)"
    elif remainder == 6:
        element = "Sun (Wafq 6x6)"
        jobs = "Public Relations, Management, Executive, Spotlight roles"
        team_match = "Natural center of gravity. Needs Moon for emotional balance."
        icon = "🌞"
        asmaul_husna = "Ya Aziz, Ya Majid (For honor, glory, and success)"
    elif remainder == 7:
        element = "Venus (Wafq 7x7)"
        jobs = "Design, Mediation, Culture Building, Art"
        team_match = "Brings harmony. Pairs beautifully with Mars (balance of drive and tact)."
        icon = "⭐"
        asmaul_husna = "Ya Wadud, Ya Latif (For love, harmony, and gentleness)"
    elif remainder == 8:
        element = "Mercury (Wafq 8x8)"
        jobs = "Communication, Analyst, Trading, Logistics"
        team_match = "Highly adaptable. The ultimate team glue."
        icon = "☿️"
        asmaul_husna = "Ya Alim, Ya Hakim (For supreme intellect & wisdom)"
    else: # 9
        element = "Moon (Wafq 9x9)"
        jobs = "Intuition, Empathy, Caretaking, UX Research"
        team_match = "Reflective. Needs strong Sun or Jupiter for structural safety."
        icon = "🌘"
        asmaul_husna = "Ya Nur, Ya Batin (For inner light & hidden knowledge)"
        
    return {
        "weight": total_weight,
        "calculation": calc_string,
        "modulo_rule": modulo_string,
        "element": element,
        "icon": icon,
        "asmaul_husna": asmaul_husna,
        "suitable_jobs": jobs,
        "team_compatibility": team_match
    }

def analyze_falakiyah(name, year, month, day, hour=12):
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
    
    def get_zodiac_sign(lon):
        degrees = lon * 180 / ephem.pi
        signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
        return signs[int(degrees / 30) % 12]

    sun_eq = ephem.Equatorial(sun.ra, sun.dec, epoch=obs.date)
    sun_ecl = ephem.Ecliptic(sun_eq)
    
    moon_eq = ephem.Equatorial(moon.ra, moon.dec, epoch=obs.date)
    moon_ecl = ephem.Ecliptic(moon_eq)
    
    sun_sign = get_zodiac_sign(sun_ecl.lon)
    moon_sign = get_zodiac_sign(moon_ecl.lon)
    
    lunar_phase = moon.phase 
    
    abjad_data = calculate_abjad(name)
    
    # Planetary HR Implications based on Shams al-Ma'arif
    planets_data = [
        {"name": "Sun", "constellation": str(ephem.constellation(sun)[1]), "implication": "Core identity, authority, and vitality in the workplace. Drives leadership presence."},
        {"name": "Moon", "constellation": str(ephem.constellation(moon)[1]), "implication": "Emotional intelligence, intuition, and adaptability. Governs empathy and team care."},
        {"name": "Mars", "constellation": str(ephem.constellation(mars)[1]), "implication": "Action, courage, and conflict resolution. Dictates how they handle crises and push projects."},
        {"name": "Venus", "constellation": str(ephem.constellation(venus)[1]), "implication": "Harmony, mediation, and cultural fit. Influences diplomacy and aesthetic problem-solving."},
        {"name": "Jupiter", "constellation": str(ephem.constellation(jupiter)[1]), "implication": "Expansion, wisdom, and mentorship. Indicates potential for long-term strategic growth."},
        {"name": "Saturn", "constellation": str(ephem.constellation(saturn)[1]), "implication": "Structure, discipline, and karma. Shows ability to handle tedious tasks and enforce rules."}
    ]
    
    return {
        "sun_sign": sun_sign,
        "moon_sign": moon_sign,
        "lunar_illumination": f"{lunar_phase:.1f}%",
        "planetary_positions": planets_data,
        "hr_insight": f"Sun in {sun_sign} provides core identity, while Moon in {moon_sign} drives emotional intelligence. Their hidden power is tied to {abjad_data['element']}.",
        "numerology": abjad_data
    }
