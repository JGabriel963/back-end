from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from src.schema import schema
from src.infra.slqalchemy.config.database import get_db, criar_db
from src.infra.slqalchemy.repositorios.product import RespositorioProduto

criar_db()

app = FastAPI()

@app.post('/produtos')
def criar_produtos(produto: schema.Produto, db: Session = Depends(get_db)):
    produto = RespositorioProduto(db).criar(produto)
    return produto

@app.get("/produtos")
def listar_produtos():
    return {'Msg': 'Listagem de Produtos'}