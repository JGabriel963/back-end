from sqlmodel import create_engine

def obter_engine():
    db_url = 'postgresql+psycopg2://jgabriel963:130302jg@localhost:5432/smarthome'
    engine = create_engine(db_url, echo=True)

    return engine