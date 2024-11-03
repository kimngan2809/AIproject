from app.services.base_service import BaseService
from ..models.customer_model import CustomerModel

class CustomerService(BaseService): 
    def __init__(self, model= CustomerModel(), session = None):
        super().__init__(model, session)

    def create(self, data):
        response = self.model.create(data)  # Tạo khách hàng mới
        return response

    def get_by_phoneNumber(self, phoneNumber):
        customer = self.model.get_by_phoneNumber(phoneNumber)
        return customer

    # Hàm để cập nhật thông tin khách hàng
    def update_customer(self, data):
        customer = self.model.get_by_id(data['id'])
        
        if not customer:
            return {"error": "Customer not found"}, 404

        # Cập nhật thông tin khách hàng
        update_data = {
            "name": data['name'],
            "phoneNumber": data['phoneNumber'],
        }

        # Nếu có tệp chữ ký mới thì cập nhật
        if 'signature' in data and data['signature']:
            update_data['signature'] = data['signature']

        self.model.update({"_id": customer["_id"]}, update_data)
        return {"message": "Customer updated successfully"}, 200

    # Hàm để xóa khách hàng
    def delete_customer(self, customer_id):
        print(f"Service ID Customer: {customer_id}")

        customer = self.model.get_by_id(customer_id)
        if not customer:
            return {"error": "Customer not found"}, 404

        self.model.delete(customer["_id"])
        return {"message": "Customer deleted successfully"}, 200

    def get_all(self):
        return self.model.get_all()