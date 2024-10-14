from app.services.base_service import BaseService
from ..models.exchange_model import ExchangeModel
class ExchangeService(BaseService):
    def __init__(self, model = ExchangeModel, session = None):
        super().__init__(model, session)
