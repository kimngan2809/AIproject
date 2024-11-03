from app.config.Hash import Hash
from app.services.base_service import BaseService
from ..models.staff_model import StaffModel
from app.models.base_model import BaseModel
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
    
    def get_by_username(self, username):
        user = self.model.get_by_username(username)
        return user
    # Hàm để cập nhật thông tin nhân viên
    def update_employee(self, data):
        print(f"Service employee_data: {data}")
       
        employee = self.model.get_by_id(data['id'])
        if not employee:
            return {"error": "Employee not found"}, 404
       
        # Cập nhật thông tin nhân viên
        update_data = {
            "name": data['name'],
            "email": data['email'],
            "idEmployee": data['idEmployee'],
            "phoneNumber": data['phoneNumber'],
            "username": data['username']
        }
       
        if 'password' in data and data['password']:
            hash_util = Hash()
            update_data['password'] = hash_util.getHash(data['password'])  # Hash lại mật khẩu
           
        print(f"Updated employee_data: {update_data}")
        self.model.update({"_id": employee["_id"]}, update_data)
       
        return {"message": "Employee updated successfully"}, 200


    # Hàm để xóa nhân viên
    def delete_employee(self, employee_id):
        print(f"Service ID Staff: {employee_id}")
       
        employee = self.model.get_by_id(employee_id)
        if not employee:
            return {"error": "Employee not found"}, 404


        self.model.delete(employee["_id"])
        return {"message": "Employee deleted successfully"}, 200
    def get_all(self):
        return self.model.get_all()
    def account(self,data):
        return self.model.get_by_email(data)

