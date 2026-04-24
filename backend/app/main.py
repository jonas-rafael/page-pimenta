from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
import os
from .core.database import engine, Base, get_db
from .models import reserva as models
from .schemas import reserva as schemas

# Cria as tabelas no MySQL automaticamente ao iniciar
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Casa Pimenta API")

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas da API
@app.get("/api/reservas", response_model=List[schemas.ReservaResponse])
def listar_reservas(db: Session = Depends(get_db)):
    return db.query(models.Reserva).all()

@app.post("/api/reservas", response_model=schemas.ReservaResponse)
def criar_reserva(reserva: schemas.ReservaCreate, db: Session = Depends(get_db)):
    db_reserva = models.Reserva(**reserva.model_dump())
    db.add(db_reserva)
    db.commit()
    db.refresh(db_reserva)
    return db_reserva

# Servir Frontend (apenas se a pasta static existir - útil para Docker)
static_path = "static"
if os.path.exists(static_path):
    app.mount("/", StaticFiles(directory=static_path, html=True), name="static")

@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    if os.path.exists(os.path.join(static_path, "index.html")):
        return FileResponse(os.path.join(static_path, "index.html"))
    return {"message": "API rodando. Frontend não encontrado em ./static"}
