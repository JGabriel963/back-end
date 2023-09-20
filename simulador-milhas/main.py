from fastapi import FastAPI
from controllers.milhas_controller import router, prefix
from models.milhas import *

app = FastAPI()

@app.get('/')
def hello():
    return "Hello"

app.include_router(router, prefix=prefix)