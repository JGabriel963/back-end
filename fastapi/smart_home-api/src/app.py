from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

ambientes = []

ambiente_id = 0
dispositivo_id = 0

class Dispositivo(BaseModel):
    description: str
    icone: int | None
    estado_conexao: str | None
    status: bool | None

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
    global ambiente_id
    ambiente.icone = ambiente_id
    ambiente_id += 1
    ambientes.append(ambiente)
    return ambiente

@app.put('/ambientes/{id}', status_code=status.HTTP_200_OK)
def atualizar_ambientes(id: int, ambiente: Ambiente):
    ambienteId = buscar_ambiente(id)
    if not ambienteId:
        raise HTTPException(status_code=404, detail='Ambiente não encontrado')
    ambienteId.descricao = ambiente.descricao

    return ambienteId
    

@app.delete('/ambientes/{id}')
def remover_ambiente(id: int):
    ambiente = buscar_ambiente(id)
    if not ambiente:
        raise HTTPException(status_code=404, detail='Ambiente não encontrado')
    if len(ambiente.items) != 0:
        raise HTTPException(status_code=401, detail="Ambiente não pode ser removido")
    else:
        ambientes.remove(ambiente)

'''Área Dispositivo'''
@app.post('/ambientes/{id}/dispositivos')
def adicionar_dispositivo(id: int, dispositivo: Dispositivo):
    global dispositivo_id
    dispositivo.icone = dispositivo_id
    dispositivo_id += 1
    ambiente = buscar_ambiente(id)
    if not ambiente:
        raise HTTPException(status_code=404, detail='Ambiente não encontrado')
    ambiente.items.append(dispositivo)
    return ambiente.items

def buscar_dispositivo(id, ambiente):
    for item in ambiente.items:
        if item.icone == id:
            return item
    return None

@app.put('/ambientes/{ambiente_id}/dispositivos/{dispositivo_id}/mover/{destino_id}')
def mover_dispositivo(ambiente_id: int, dispositivo_id: int, destino_id: int):
    origem = buscar_ambiente(ambiente_id)
    destino = buscar_ambiente(destino_id)
    dispositivo = buscar_dispositivo(dispositivo_id, origem)

    if not origem and not destino and not dispositivo:
        raise HTTPException(status_code=404, detail="Error ao buscar dados")
        
    origem.items.remove(dispositivo)
    destino.items.append(dispositivo)
    

    
