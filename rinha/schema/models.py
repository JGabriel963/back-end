from sqlmodel import Field, SQLModel

class Pessoa(SQLModel, table=True): 
    id: int | None = Field(default=None, primary_key=True)
    apelido: str
    nome: str
    nascimento: str
