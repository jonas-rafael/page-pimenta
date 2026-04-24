from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class ReservaBase(BaseModel):
    nome_cliente: str
    telefone: str
    data_inicio: date
    data_fim: date

class ReservaCreate(ReservaBase):
    pass

class ReservaUpdate(BaseModel):
    status: Optional[str] = None

class ReservaResponse(ReservaBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
