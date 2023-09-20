from fastapi import APIRouter, status, HTTPException, Response
from models.milhas import MilhasBase, Milhas

router = APIRouter()
prefix = '/milhas'

@router.post('/', status_code=status.HTTP_201_CREATED)
def criar_milha(milha: MilhasBase):
    nova_milha = Milhas.from_milha_create(milha)

    return nova_milha
