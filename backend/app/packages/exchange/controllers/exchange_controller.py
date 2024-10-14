from app.controllers.base_controller import BaseController
from ..services.exchange_service import ExchangeService
class ExchangeController(BaseController):
    def __init__(self, service=ExchangeService):
        super().__init__(service)