from lunar_python import Solar, Lunar, EightChar

STEMS_INFO = {
    "甲": {
        "pinyin": "Jiǎ",
        "element": "Wood",
        "polarity": "Yang",
        "translation": "Kayu Yang (Yang Wood)",
        "symbol": "Pohon Besar / Hutan (Sturdy Tree)",
        "meaning": "Pemimpin alami, berprinsip kuat, menyukai tantangan, berorientasi pada pertumbuhan, tetapi cenderung kaku dan keras kepala."
    },
    "乙": {
        "pinyin": "Yǐ",
        "element": "Wood",
        "polarity": "Yin",
        "translation": "Kayu Yin (Yin Wood)",
        "symbol": "Tanaman Rambat / Bunga (Creeping Vine)",
        "meaning": "Fleksibel, pandai beradaptasi, diplomatis, tangguh dalam bertahan, pandai berjejaring, tetapi mudah terpengaruh lingkungan."
    },
    "丙": {
        "pinyin": "Bǐng",
        "element": "Fire",
        "polarity": "Yang",
        "translation": "Api Yang (Yang Fire)",
        "symbol": "Matahari (The Sun)",
        "meaning": "Hangat, ceria, murah hati, penuh semangat, vokal, menyinari orang sekitar, tetapi cenderung tidak sabaran dan emosional."
    },
    "丁": {
        "pinyin": "Dīng",
        "element": "Fire",
        "polarity": "Yin",
        "translation": "Api Yin (Yin Fire)",
        "symbol": "Api Lilin / Obor (Candle Light)",
        "meaning": "Penuh perhatian, fokus pada detail, pemikir mendalam, hangat secara halus, membimbing, tetapi sensitif dan mudah menyimpan dendam."
    },
    "戊": {
        "pinyin": "Wù",
        "element": "Earth",
        "polarity": "Yang",
        "translation": "Tanah Yang (Yang Earth)",
        "symbol": "Gunung / Batu Besar (Solid Mountain)",
        "meaning": "Sangat stabil, dapat diandalkan, setia, protektif, berprinsip kokoh, tetapi cenderung lambat bergerak, konservatif, dan kaku."
    },
    "己": {
        "pinyin": "Jǐ",
        "element": "Earth",
        "polarity": "Yin",
        "translation": "Tanah Yin (Yin Earth)",
        "symbol": "Tanah Kebun / Sawah (Fertile Soil)",
        "meaning": "Suka membimbing, produktif, penuh toleransi, kreatif, berjiwa pengasuh, tetapi cenderung terlalu khawatir dan sulit berkata tidak."
    },
    "庚": {
        "pinyin": "Gēng",
        "element": "Metal",
        "polarity": "Yang",
        "translation": "Logam Yang (Yang Metal)",
        "symbol": "Besi Kasar / Pedang (Raw Ore / Sword)",
        "meaning": "Tegas, menjunjung keadilan, pekerja keras, berani mengambil keputusan sulit, tetapi cenderung dingin, kaku, dan ofensif."
    },
    "辛": {
        "pinyin": "Xīn",
        "element": "Metal",
        "polarity": "Yin",
        "translation": "Logam Yin (Yin Metal)",
        "symbol": "Emas Permata / Pisau Bedah (Jewelry)",
        "meaning": "Anggun, perfeksionis, sangat teliti, menyukai keindahan, tajam berpikir, tetapi haus perhatian dan rapuh jika dikritik."
    },
    "壬": {
        "pinyin": "Rén",
        "element": "Water",
        "polarity": "Yang",
        "translation": "Air Yang (Yang Water)",
        "symbol": "Air Laut / Sungai Besar (Ocean/River)",
        "meaning": "Dinamis, cerdas, berwawasan luas, menyukai kebebasan, enerjik, pemberontak yang positif, tetapi tidak suka dikekang."
    },
    "癸": {
        "pinyin": "Guǐ",
        "element": "Water",
        "polarity": "Yin",
        "translation": "Air Yin (Yin Water)",
        "symbol": "Air Hujan / Embun (Rain/Dew)",
        "meaning": "Sangat intuitif, imajinatif, penuh rahasia, tenang di permukaan, empati tinggi, tetapi moody dan mudah cemas."
    }
}

BRANCHES_INFO = {
    "子": {"pinyin": "Zǐ", "zodiac": "Tikus (Rat)", "element": "Water", "meaning": "Cerdas, gesit, pandai mencari peluang, analitis, dan memiliki daya tahan mental yang tinggi."},
    "丑": {"pinyin": "Chǒu", "zodiac": "Kerbau (Ox)", "element": "Earth", "meaning": "Pekerja keras, konsisten, setia, bertekad kuat, tetapi keras kepala."},
    "寅": {"pinyin": "Yín", "zodiac": "Macan (Tiger)", "element": "Wood", "meaning": "Berani, mandiri, berwibawa, berjiwa pemimpin, tetapi impulsif."},
    "卯": {"pinyin": "Mǎo", "zodiac": "Kelinci (Rabbit)", "element": "Wood", "meaning": "Sopan, diplomatis, artistik, waspada, menyukai kedamaian."},
    "辰": {"pinyin": "Chén", "zodiac": "Naga (Dragon)", "element": "Earth", "meaning": "Kreatif, ambisius, penuh visi, karismatik, tetapi suka mendominasi."},
    "巳": {"pinyin": "Sì", "zodiac": "Ular (Snake)", "element": "Fire", "meaning": "Bijaksana, analitis, tenang, misterius, dan tajam dalam berstrategi."},
    "午": {"pinyin": "Wǔ", "zodiac": "Kuda (Horse)", "element": "Fire", "meaning": "Aktif, ceria, ramah, mencintai kebebasan, tetapi tidak sabaran."},
    "未": {"pinyin": "Wèi", "zodiac": "Kambing (Goat)", "element": "Earth", "meaning": "Lembut, artistik, menyukai harmoni, tekun secara tenang, tetapi peragu."},
    "申": {"pinyin": "Shēn", "zodiac": "Monyet (Monkey)", "element": "Metal", "meaning": "Cerdik, serba bisa, humoris, pandai beradaptasi, pemecah masalah yang andal."},
    "酉": {"pinyin": "Yǒu", "zodiac": "Ayam (Rooster)", "element": "Metal", "meaning": "Percaya diri, rapi, teliti, pandai berkomunikasi, berani mengemukakan pendapat."},
    "戌": {"pinyin": "Xū", "zodiac": "Anjing (Dog)", "element": "Earth", "meaning": "Sangat setia, jujur, protektif, berintegritas tinggi, berorientasi pada tim."},
    "亥": {"pinyin": "Hài", "zodiac": "Babi (Pig)", "element": "Water", "meaning": "Jujur, murah hati, menyukai kedamaian, toleransi tinggi, kooperatif."}
}

def analyze_bazi(year, month, day, hour=12):
    solar = Solar.fromYmdHms(year, month, day, hour, 0, 0)
    lunar = solar.getLunar()
    bazi = lunar.getEightChar()
    
    # Extract stems and branches
    year_stem = bazi.getYearGan()
    year_branch = bazi.getYearZhi()
    
    month_stem = bazi.getMonthGan()
    month_branch = bazi.getMonthZhi()
    
    day_stem = bazi.getDayGan() # Day Master (Self)
    day_branch = bazi.getDayZhi()
    
    time_stem = bazi.getTimeGan()
    time_branch = bazi.getTimeZhi()
    
    # Simple Element Mapping based on Day Master
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
    
    # Helper function to generate pillar detail dictionary
    def get_pillar_detail(stem, branch):
        stem_info = STEMS_INFO.get(stem, {
            "pinyin": "?", "element": "Unknown", "polarity": "Unknown",
            "translation": "Unknown", "symbol": "Unknown", "meaning": "Unknown"
        })
        branch_info = BRANCHES_INFO.get(branch, {
            "pinyin": "?", "zodiac": "Unknown", "element": "Unknown", "meaning": "Unknown"
        })
        return {
            "character": stem + branch,
            "stem": {
                "character": stem,
                "pinyin": stem_info["pinyin"],
                "element": stem_info["element"],
                "polarity": stem_info["polarity"],
                "translation": stem_info["translation"],
                "symbol": stem_info["symbol"],
                "meaning": stem_info["meaning"]
            },
            "branch": {
                "character": branch,
                "pinyin": branch_info["pinyin"],
                "zodiac": branch_info["zodiac"],
                "element": branch_info["element"],
                "meaning": branch_info["meaning"]
            }
        }

    dm_info = STEMS_INFO.get(day_stem, {})
    dm_detail = {
        "character": day_stem,
        "pinyin": dm_info.get("pinyin", ""),
        "element": dm_info.get("element", ""),
        "polarity": dm_info.get("polarity", ""),
        "translation": dm_info.get("translation", ""),
        "symbol": dm_info.get("symbol", ""),
        "meaning": dm_info.get("meaning", "")
    }

    return {
        "pillars": {
            "year": get_pillar_detail(year_stem, year_branch),
            "month": get_pillar_detail(month_stem, month_branch),
            "day": get_pillar_detail(day_stem, day_branch),
            "time": get_pillar_detail(time_stem, time_branch)
        },
        "day_master": dm_detail,
        "elements": elements_map.get(day_stem, {"Wood": 20, "Fire": 20, "Earth": 20, "Metal": 20, "Water": 20}),
        "traits": traits_map.get(day_stem, ["Balanced"]),
        "best_roles": roles_map.get(day_stem, ["Generalist"]),
        "team_synergy": f"As a '{day_stem}' ({dm_info.get('pinyin')} - {dm_info.get('translation')}) Day Master, this candidate leads with their core traits: {dm_info.get('meaning')}"
    }
