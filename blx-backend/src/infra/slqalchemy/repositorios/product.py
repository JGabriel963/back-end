from sqlalchemy.orm import Session
from src.schema import schema
from src.infra.slqalchemy.models import models

class RespositorioProduto():

    def __init__(self, db: Session):
        self.db = db

    def criar(self, produto: schema.Produto):
        db_produto = models.Produto(nome=produto.nome, detalhes=produto.detalhes, preco=produto.preco,
        disponivel=produto.disponivel)

        self.db.add(db_produto)
        self.db.commit()
        self.db.refresh(db_produto)
        return db_produto

    def listar(self):
        produtos = self.db.query(models.Produto).all()
        return produtos

    def obter(self):
        pass

    def remover(self):
        pass