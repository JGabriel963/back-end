from fastapi import APIRouter
from schema.models import Pessoa
from services.pessoas_service import PessoaService
from database.utils import obter_engine

engine = obter_engine()

router = APIRouter()
pessoas_service = PessoaService()

@router.post('/pessoas')
async def criar_pessoas(pessoa: Pessoa):
    return pessoas_service.criar_pessoa(pessoa)

@router.get('/pessoas/{id}')
async def consultar_pessoa(id: int):
    return pessoas_service.consultar_pessoa(id)

@router.get('/pessoas')
async def consultar_por_termo(t: str | None):
    if not t:
        return pessoas_service.buscar_todas_pessoas()
    return pessoas_service.consultar_por_termo(t)


