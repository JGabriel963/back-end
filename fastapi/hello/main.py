from fastapi import FastAPI

from pydantic import BaseModel

app = FastAPI()

class Animal(BaseModel):
    nome: str
    ano_nascimento: int
    cor: str

a1 = Animal(
    nome="Marry", 
    ano_nascimento=2020, 
    cor="Amarelo"
)

b1 = Animal(nome="Fumaça", ano_nascimento=2023, cor="Cinza")


animais = [a1, b1]

@app.get("/hello")
def hello():
    return {"message": "Olá, Sejá bem-vindo"}

@app.get('/animais')
def obter_animais():
    return animais


@app.post("/animais")
def novo_animal(animal: Animal):
    animais.append(animal)
    return None
