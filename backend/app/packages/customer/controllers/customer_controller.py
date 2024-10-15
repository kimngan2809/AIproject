import os
from flask import request, jsonify
from ..services.customer_service import CustomerService
from app.controllers.base_controller import BaseController
from app import app

class CustomerController(BaseController): 
    def __init__(self, service = CustomerService()): 
        super().__init__(service)
    def create(self, data):
        return super().create(data)
    
customer_controller = CustomerController()
@app.route('/api/add-customer',methods=['POST'])
def create_customer():
    if 'name' not in request.form or 'phoneNumber' not in request.form or 'customerId' not in request.form or 'image' not in request.files:
        return jsonify({"error": "Missing required fields"}), 400
    # Lấy thông tin text từ form
    name = request.form.get('name')
    phone_number = request.form.get('phoneNumber')
    customer_id = request.form.get('customerId')
    # Kiểm tra file ảnh trong request
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    image = request.files['image']

    # Kiểm tra xem tất cả các trường đã được điền đủ chưa
    if not name or not phone_number or not customer_id:
        return jsonify({"error": "Missing required fields"}), 400
    
    image_filename = f"{customer_id}_{image.filename}"
    # Bạn có thể lưu ảnh vào server hoặc thực hiện hành động khác với dữ liệu này
    image_path = os.path.join(os.getenv('STORAGE_PATH'), image_filename)
    
    # Ensure the directory exists
    os.makedirs(os.path.dirname(image_path), exist_ok=True)
            # Save the PIL image to the specified file path

    image.save(image_path)  # Ví dụ: lưu ảnh
    # Chuẩn bị dữ liệu để lưu thông tin khách hàng vào cơ sở dữ liệu
    customer_data = {
        "name": name,
        "phoneNumber": phone_number,
        "customerId": customer_id,
        "imagePath": image_filename  # Đường dẫn của file ảnh đã lưu
    }

    # Giả sử bạn có một controller để xử lý lưu thông tin
    return customer_controller.create(customer_data)
