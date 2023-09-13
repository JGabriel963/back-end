from fastapi import FastAPI
from sqlmodel import SQLModel
from database.utils import obter_engine
from controllers.pessoas_controller import router as pessoa_router


app = FastAPI()

engine = obter_engine()

SQLModel.metadata.create_all(engine)

app.include_router(pessoa_router)