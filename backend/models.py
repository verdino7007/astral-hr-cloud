from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    token = Column(String, index=True, nullable=True)

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    birth_date = Column(String)
    birth_time = Column(String)
    overall_score = Column(Integer)
    analysis_data = Column(JSON) # Stores bazi, primbon, falakiyah results
    user_id = Column(Integer, nullable=True) # ID of the user who ingested this file
