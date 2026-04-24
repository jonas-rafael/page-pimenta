from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.sql import func
from ..core.database import Base

class Reserva(Base):
    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True, index=True)
    nome_cliente = Column(String(100), nullable=False)
    telefone = Column(String(20), nullable=False)
    data_inicio = Column(Date, nullable=False)
    data_fim = Column(Date, nullable=False)
    status = Column(String(20), default="pendente") # pendente, confirmado, cancelado
    created_at = Column(DateTime(timezone=True), server_default=func.now())
