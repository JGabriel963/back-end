from schema.models import Pessoa
from database.utils import obter_engine
from sqlmodel import Session, select 


class PessoaService():
    def __init__(self):
        self.session = Session(obter_engine())

    
    def criar_pessoa(self, pessoa: Pessoa):
        self.session.add(pessoa)
        self.session.commit()
        self.session.refresh(pessoa)
        self.session.close()
        
        return pessoa
    
    def buscar_todas_pessoas(self):
        instrucao = select(Pessoa)
        pessoas = self.session.exec(instrucao).fetchall()
        self.session.close()
    
        return pessoas
    
    def consultar_pessoa(self, id: int):
        instrucao = select(Pessoa).where(Pessoa.id == id)
        pessoa = self.session.exec(instrucao).first()
        self.session.close()

        return pessoa
    

    def consultar_por_termo(self, t: str):
        pessoas = self.session.query(Pessoa).filter((Pessoa.nome.like(f"%{t}%")) | (Pessoa.apelido.like(f"%{t}%"))).all()
        self.session.close()

        return pessoas
    