from sqlalchemy import Column, Integer, String, JSON
from database import Base

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    birth_date = Column(String)
    birth_time = Column(String)
    overall_score = Column(Integer)
    analysis_data = Column(JSON) # Stores bazi, primbon, falakiyah results
