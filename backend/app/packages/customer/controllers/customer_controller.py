import os
from flask import request, jsonify
from ..services.customer_service import CustomerService
from app.controllers.base_controller import BaseController
from app import app
import jwt

class CustomerController(BaseController): 
    def __init__(self, service=CustomerService()): 
        super().__init__(service)

    def create(self, data):
        return super().create(data)

    # Hàm mới để cập nhật hoặc xóa thông tin khách hàng
    def update_or_delete_customer(self, data):
        # Kiểm tra token từ header
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({"error": "Token is missing!"}), 403

        try:
            decoded_token = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
            if decoded_token['role'] != 'admin':  # Kiểm tra quyền admin
                return jsonify({"error": "You are not authorized to access this resource"}), 403
        except Exception as e:
            return jsonify({"error": "Invalid token!"}), 403

        # Gọi service để thay đổi hoặc xóa thông tin khách hàng
        if "action" in data and data["action"] == "delete":
            result = self.service.delete_customer(data["id"])
        else:
            result = self.service.update_customer(data)

        return jsonify(result)
    def get_customer(self):
        documents = self.service.get_all()
        return jsonify(documents), 200

customer_controller = CustomerController()

@app.route('/api/add-customer', methods=['POST'])
def create_customer():
    if 'name' not in request.form or 'phoneNumber' not in request.form or 'customerId' not in request.form or 'image' not in request.files:
        return jsonify({"error": "Missing required fields"}), 400
    
    # Lấy thông tin từ form
    name = request.form.get('name')
    phone_number = request.form.get('phoneNumber')
    customer_id = request.form.get('customerId')

    # Kiểm tra file ảnh trong request
    image = request.files['image'] if 'image' in request.files else None
    if not image:
        return jsonify({"error": "No image uploaded"}), 400

    image_filename = f"{customer_id}_{image.filename}"
    image_path = os.path.join(os.getenv('STORAGE_PATH'), image_filename)
    
    # Tạo thư mục nếu chưa tồn tại
    os.makedirs(os.path.dirname(image_path), exist_ok=True)
    
    # Lưu ảnh vào đường dẫn
    image.save(image_path)
    
    # Lưu thông tin khách hàng vào cơ sở dữ liệu
    customer_data = {
        "name": name,
        "phoneNumber": phone_number,
        "customerId": customer_id,
        "imagePath": image_filename
    }

    return customer_controller.create(customer_data)

# Route cho API xóa hoặc thay đổi thông tin khách hàng
@app.route('/api/admin/customer', methods=['POST'])
def update_or_delete_customer():
    data = request.json
    if not data or 'id' not in data:
        return jsonify({"error": "Missing customer ID"}), 400
    return customer_controller.update_or_delete_customer(data)
@app.route('/api/admin/customers', methods=['GET'])
def get_customers():
    return  customer_controller.get_customer()
