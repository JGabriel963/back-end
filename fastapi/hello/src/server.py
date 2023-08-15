from fastapi import FastAPI, HTTPException, status

from pydantic import BaseModel

proximo_id = 3

app = FastAPI()

class Animal(BaseModel):
    id: int | None = None
    nome: str
    ano_nascimento: int
    cor: str

a1 = Animal(id=1, nome="Marry", ano_nascimento=2020, cor="Amarelo")

b1 = Animal(id=2, nome="Fumaça", ano_nascimento=2023, cor="Cinza")


animais = [a1, b1]

def buscar_animal(id: int):
    for animal in animais:
        if animal.id == id:
            return animal
    return None

@app.get("/hello")
def hello():
    return {"message": "Olá, Sejá bem-vindo"}

@app.get('/animais')
def obter_todos_os_animais():
    return animais

@app.get('/animais/{id}')
def ober_um_animal(id: int):
    animal = buscar_animal(id)
    if not animal:
        raise HTTPException(status_code=404, detail='Animal não encontrado')
    return animal


@app.post("/animais", status_code=status.HTTP_201_CREATED)
def novo_animal(animal: Animal):
    global proximo_id
    animal.id = proximo_id
    proximo_id += 1
    animais.append(animal)
    return animal

@app.delete("/animais/{id}", status_code=status.HTTP_204_NO_CONTENT)
def remover_um_animal(id: int):
    animal = buscar_animal(id)
    if not animal:
        raise HTTPException(status_code=404, detail='Animal não localizado')
    
    # remover da lista
    animais.remove(animal)
