from sqlmodel import SQLModel, Field
from ulid import ulid

class MilhasBase(SQLModel):
    quantidade: int
    desconto: float
    bonus: float


class Milhas(MilhasBase):
    id: str = Field(default=ulid())
    valor_ref: str = Field(default='R$ 70,00')
    valor_desconto: float
    milhas_bonus: float
    valor_pagar: float
    milhas_receber: float
    valor_real: float

    @staticmethod
    def from_milha_create(milhas_create: MilhasBase):

        valor_desconto = 70 - ((milhas_create.desconto / 100) * 70)
        milhas_bonus = (milhas_create.bonus / 100) * milhas_create.quantidade
        valor_pagar = (milhas_create.quantidade / 1000) * valor_desconto
        milhas_receber = milhas_create.quantidade * (milhas_bonus / 1000)
        valor_real = valor_pagar / (milhas_receber / 1000)
        milha = Milhas(
            quantidade=milhas_create.quantidade,
            desconto=milhas_create.desconto,
            bonus=milhas_create.bonus,
            valor_desconto=valor_desconto,
            milhas_bonus=milhas_bonus,
            valor_pagar=valor_pagar,
            milhas_receber=milhas_receber,
            valor_real=valor_real,
        )


        return milha