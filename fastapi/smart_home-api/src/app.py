from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

ambientes = []

proximo_id = 0

class Dispositivo(BaseModel):
    description: str
    icone: str
    estado_conexao: str
    status: bool

class Ambiente(BaseModel):
    descricao: str
    icone: int | None
    items: list[Dispositivo] = []

'''Aréa Ambiente'''
def buscar_ambiente(id: int):
    for ambiente in ambientes:
        if ambiente.icone == id:
            return ambiente
    return None

@app.get('/ambientes', status_code=status.HTTP_200_OK)
def show_ambiente():
    return ambientes

@app.post('/ambientes', status_code=status.HTTP_201_CREATED)
def criar_ambiente(ambiente: Ambiente):
    global proximo_id
    ambiente.icone = proximo_id
    proximo_id += 1
    ambientes.append(ambiente)
    return ambiente

@app.put('/ambientes/{id}', status_code=status.HTTP_200_OK)
def atualizar_dispositivos(id: int, ambiente: Ambiente):
    ambienteId = buscar_ambiente(id)
    if not ambienteId:
        raise HTTPException(status_code=404, detail='Ambiente não encontrado')
    ambienteId = ambiente
    

@app.delete('/ambientes/{id}')
def remover_ambiente(id: int):
    ambiente = buscar_ambiente(id)
    if not ambiente:
        raise HTTPException(status_code=404, detail='Ambiente não encontrado')
    ambientes.remove(ambiente)

'''Área Dispositivo'''
@app.post('/ambientes/{id}/dispositivos')
def hello():
    return { "message": "Hello"}