from lunar_python import Solar, Lunar, EightChar

def analyze_bazi(year, month, day, hour=12):
    solar = Solar.fromYmdHms(year, month, day, hour, 0, 0)
    lunar = solar.getLunar()
    bazi = lunar.getEightChar()
    
    # Extract stems and branches
    year_stem = bazi.getYearGan()
    year_branch = bazi.getYearZhi()
    day_stem = bazi.getDayGan() # The Day Master (Self)
    
    # Simple Element Mapping based on Day Master (Simplified for HR)
    elements_map = {
        "甲": {"Wood": 40, "Fire": 20, "Earth": 10, "Metal": 10, "Water": 20},
        "乙": {"Wood": 35, "Fire": 25, "Earth": 15, "Metal": 5, "Water": 20},
        "丙": {"Wood": 20, "Fire": 40, "Earth": 20, "Metal": 10, "Water": 10},
        "丁": {"Wood": 25, "Fire": 35, "Earth": 25, "Metal": 5, "Water": 10},
        "戊": {"Wood": 10, "Fire": 20, "Earth": 40, "Metal": 20, "Water": 10},
        "己": {"Wood": 15, "Fire": 25, "Earth": 35, "Metal": 15, "Water": 10},
        "庚": {"Wood": 10, "Fire": 10, "Earth": 20, "Metal": 40, "Water": 20},
        "辛": {"Wood": 5, "Fire": 15, "Earth": 25, "Metal": 35, "Water": 20},
        "壬": {"Wood": 20, "Fire": 10, "Earth": 10, "Metal": 20, "Water": 40},
        "癸": {"Wood": 25, "Fire": 5, "Earth": 15, "Metal": 20, "Water": 35},
    }
    
    traits_map = {
        "甲": ["Visionary", "Stubborn", "Growth-oriented"],
        "乙": ["Adaptable", "Diplomatic", "Networking"],
        "丙": ["Charismatic", "Generous", "Impatient"],
        "丁": ["Detail-oriented", "Guiding", "Sensitive"],
        "戊": ["Reliable", "Conservative", "Trustworthy"],
        "己": ["Nurturing", "Resourceful", "Tolerant"],
        "庚": ["Decisive", "Justice-driven", "Rigid"],
        "辛": ["Elegant", "Perfectionist", "Sharp"],
        "壬": ["Dynamic", "Intelligent", "Rebellious"],
        "癸": ["Intuitive", "Imaginative", "Moody"],
    }
    
    roles_map = {
        "甲": ["CEO", "Pioneer", "Strategic Planner"],
        "乙": ["PR Manager", "HR Specialist", "Negotiator"],
        "丙": ["Sales Director", "Public Speaker", "Motivator"],
        "丁": ["Researcher", "Analyst", "Counselor"],
        "戊": ["Operations Manager", "Risk Manager", "Real Estate"],
        "己": ["Community Manager", "Administrator", "Support"],
        "庚": ["Enforcer", "Military/Security", "Execution Officer"],
        "辛": ["Jeweler", "Surgeon", "Quality Assurance"],
        "壬": ["Logistics", "Entrepreneur", "Innovator"],
        "癸": ["Creative Director", "Data Scientist", "Strategist"],
    }
    
    dm_element = elements_map.get(day_stem, {"Wood": 20, "Fire": 20, "Earth": 20, "Metal": 20, "Water": 20})
    dm_traits = traits_map.get(day_stem, ["Balanced"])
    dm_roles = roles_map.get(day_stem, ["Generalist"])

    return {
        "pillars": {
            "year": year_stem + year_branch,
            "month": bazi.getMonthGan() + bazi.getMonthZhi(),
            "day": day_stem + bazi.getDayZhi(),
            "time": bazi.getTimeGan() + bazi.getTimeZhi()
        },
        "day_master": day_stem,
        "elements": dm_element,
        "traits": dm_traits,
        "best_roles": dm_roles,
        "team_synergy": f"As a '{day_stem}' Day Master, this candidate leads with their core traits."
    }
