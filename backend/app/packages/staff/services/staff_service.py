from app.config.Hash import Hash
from app.services.base_service import BaseService
from ..models.staff_model import StaffModel
from app.models.base_model import BaseModel
from app.models.customer_model import CustomerModel  # Model khách hàng

class StaffService(BaseService):
    def __init__(self, model=StaffModel(), session=None):
        super().__init__(model, session)

    def create(self, data):
        hash_util = Hash()  # Tạo một đối tượng Hash
        # Băm mật khẩu nếu có trong dữ liệu
        if 'password' in data:
            data['password'] = hash_util.getHash(data['password'])  # Thay thế mật khẩu bằng mật khẩu đã băm
        response = self.model.create(data)  # Tạo người dùng mới
        return response

    def get_by_email(self, email):
        user = self.model.get_by_email(email)
        return user

    # Hàm để lấy dữ liệu bảng điều khiển
    def get_dashboard_data(self):
        try:
            # Lấy tổng số lượng chữ ký thật và giả (dữ liệu mẫu)
            verified_signatures = self.model.mongo.db['signatures'].count_documents({"verified": True})
            forged_signatures = self.model.mongo.db['signatures'].count_documents({"forged": True})

            # Lấy khách hàng có chữ ký được xác thực nhiều nhất
            top_customer = self.model.mongo.db['signatures'].aggregate([
                {"$group": {"_id": "$customer_id", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 1}
            ])

            result = {
                "verified_signatures": verified_signatures,
                "forged_signatures": forged_signatures,
                "top_customer": list(top_customer)  # Chuyển kết quả sang list
            }
            return result
        except Exception as e:
            raise e

    # Hàm để cập nhật thông tin nhân viên
    def update_employee(self, data):
        employee = self.model.get_by_id(data['ID employee'])
        if not employee:
            return {"error": "Employee not found"}, 404

        # Cập nhật thông tin nhân viên
        update_data = {
            "first name": data['first name'],
            "last name": data['last name'],
            "email": data['email'],
            "phone number": data['phone number'],
            "username": data['username']
        }

        if 'password' in data and data['password']:
            hash_util = Hash()
            update_data['password'] = hash_util.getHash(data['password'])  # Hash lại mật khẩu

        self.model.update({"_id": employee["_id"]}, update_data)
        return {"message": "Employee updated successfully"}, 200

    # Hàm để xóa nhân viên
    def delete_employee(self, employee_id):
        employee = self.model.get_by_id(employee_id)
        if not employee:
            return {"error": "Employee not found"}, 404

        self.model.delete(employee["_id"])
        return {"message": "Employee deleted successfully"}, 200
