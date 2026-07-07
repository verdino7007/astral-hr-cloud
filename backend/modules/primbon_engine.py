from lunar_python import Solar, Lunar

def analyze_primbon(year, month, day):
    solar = Solar.fromYmdHms(year, month, day, 12, 0, 0)
    lunar = solar.getLunar()
    
    # Primbon combines 7-day week and 5-day market week (Pasaran)
    # lunar_python provides day in Ganzhi, but also day of week. 
    # For actual Pasaran, we can extract it.
    
    # Indonesian Pasaran names mapping from Chinese branches used in some calendars, 
    # but lunar_python doesn't have native Indonesian Pasaran. 
    # However, the 5-day cycle is fixed: Legi, Pahing, Pon, Wage, Kliwon.
    # We can calculate it based on Julian Day.
    
    from datetime import datetime
    
    # Calculate Pasaran index accurately using ordinal (0=Legi, 1=Pahing, 2=Pon, 3=Wage, 4=Kliwon)
    pasaran_index = datetime(year, month, day).toordinal() % 5
    pasaran_names = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"]
    pasaran = pasaran_names[pasaran_index]
    
    week_index = solar.getWeek() # 0 is Sunday, 1 is Monday
    week_names = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    hari = week_names[week_index]
    
    weton = f"{hari} {pasaran}"
    
    # Weton Neptu calculation (Traditional Javanese Numerology)
    neptu_hari = {"Minggu": 5, "Senin": 4, "Selasa": 3, "Rabu": 7, "Kamis": 8, "Jumat": 6, "Sabtu": 9}
    neptu_pasaran = {"Legi": 5, "Pahing": 9, "Pon": 7, "Wage": 4, "Kliwon": 8}
    
    total_neptu = neptu_hari[hari] + neptu_pasaran[pasaran]
    
    # HR interpretation based on Neptu
    character = ""
    if total_neptu in [7, 11, 15]:
        character = "Wasesa Segara (Generous, forgiving, great influence)"
    elif total_neptu in [8, 12, 16]:
        character = "Tunggak Semi (Resilient, resourceful, good at wealth creation)"
    elif total_neptu in [9, 13, 17]:
        character = "Satria Wibawa (Charismatic, authoritative, destined for leadership)"
    elif total_neptu in [10, 14, 18]:
        character = "Sumur Sinaba (Wise, source of knowledge, highly sought for advice)"
    else:
        character = "Satria Wirang (Requires resilience, faces challenges to build strong character)"
        
    return {
        "weton": weton,
        "neptu_score": total_neptu,
        "character": character,
        "work_style": "Harmonious" if total_neptu % 2 == 0 else "Dynamic"
    }
