from app.services.base_service import BaseService
from ..models.customer_model import CustomerModel

class CustomerService(BaseService): 
    def __init__(self, model= CustomerModel(), session = None):
        super().__init__(model, session)
    def create(self, data):
        print(data)
        response = self.model.create(data)  # Tạo người dùng mới
        print(data)
        return response
    def get_by_phoneNumber(self,phoneNumber):
        customer=self.model.get_by_phoneNumber(phoneNumber)
        return customer
