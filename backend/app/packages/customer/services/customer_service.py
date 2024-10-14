from app.config.Hash import Hash

from app.services.base_service import BaseService
from ..models.customer_model import CustomerModel

class CustomerService(BaseService): 
    def __init__(self, model= CustomerModel(), session = None):
        super().__init__(model, session)
    def create(self, data):
        return super().create(data)
    def get_by_phoneNumber(self,phoneNumber):
        customer=self.modal.get_by_phoneNumber(phoneNumber)
        return customer
