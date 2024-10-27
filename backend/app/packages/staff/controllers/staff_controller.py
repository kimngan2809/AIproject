from flask import request, jsonify
from app.controllers.base_controller import BaseController
from ..services.staff_service import StaffService
from app import app
import jwt
import os

class StaffController(BaseController):
    def __init__(self, service=StaffService()):
        super().__init__(service)

    def create(self, data):
        return super().create(data)

    # API để thay đổi hoặc xóa thông tin nhân viên (chỉ dành cho admin)
    def update_or_delete_employee(self, data):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  # Lấy JWT token từ header

        if not token:
            return jsonify({"error": "Token is missing!"}), 403

        try:
            decoded_token = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
            if decoded_token['role'] != 'admin':  # Kiểm tra quyền admin
                return jsonify({"error": "You are not authorized to access this resource"}), 403
        except Exception as e:
            return jsonify({"error": "Invalid token!"}), 403

        # Gọi service để thay đổi hoặc xóa thông tin nhân viên
        if "action" in data and data["action"] == "delete":
            result = self.service.delete_employee(data["ID employee"])
        else:
            result = self.service.update_employee(data)

        return jsonify(result)
    def get_staff(self): 
        documents = self.service.get_all()
        return jsonify(documents), 200

user_controller = StaffController()

@app.route('/api/user/signup', methods=['POST'])
def create_user():
    data = request.json
    if not data or 'email' not in data or 'password' not in data:  # Validate data
        return jsonify({"error": "Missing required fields"}), 400

    result = user_controller.create(data)
    return result



# Route cho API thay đổi hoặc xóa thông tin nhân viên
@app.route('/api/admin/employee', methods=['POST'])
def update_or_delete_employee():
    data = request.json
    if not data or 'ID employee' not in data:
        return jsonify({"error": "Missing ID employee"}), 400
    return user_controller.update_or_delete_employee(data)

@app.route('/api/admin/staff', methods=['GET'])
def  get_staff():
    return  user_controller.get_staff()


