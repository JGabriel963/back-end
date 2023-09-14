from sqlalchemy import Column, Integer, String, Float, Boolean
from src.infra.slqalchemy.config.database import Base

class Produto():

    __tablename__ = 'produtos'

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    detalhes = Column(String)
    preco = Column(Float)
    disponivel = Column(Boolean)
