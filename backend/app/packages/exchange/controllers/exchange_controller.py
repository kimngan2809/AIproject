import os
from flask import Flask, request, jsonify
from app.controllers.base_controller import BaseController
from app import app
from ..services.exchange_service import ExchangeService

class ExchangeController(BaseController):
    def __init__(self, service=ExchangeService()):
        super().__init__(service)

    def create(self, data):
        # Insert data and retrieve the new exchange ID
        result = self.service.create(data)
        if result:
            exchange_id = result  # Assuming MongoDB is used, which returns an ObjectId
            return jsonify({"message": "Exchange created successfully", "id": exchange_id}), 201
        else:
            return jsonify({"error": "Could not create exchange"}), 500

    # def verify_signature(self, customer_id, exchange_id):
    #     # Process signature verification with provided customer_id and exchange_id
    #     res = self.service.process(customer_id, exchange_id)
    #     if res:
    #         return jsonify({"message": "Signature approved"}), 200
    #     else:
    #         return jsonify({"error": "Signature not approved"}), 401
    def verify_signature(self, customer_id, exchange_id):
    # Xử lý xác minh chữ ký với customer_id và exchange_id đã cung cấp
        res = self.service.process(customer_id, exchange_id)
        print(res)  # In ra để kiểm tra giá trị trả về

        

        if res:
            return jsonify({
                "message": "Chữ ký đã được phê duyệt",
                "is_verified": res['is_verified'],  # Bao gồm is_verified trong phản hồi
                "similar": res['similar'],          # Bao gồm similar nếu cần
                "exchange_id": res['exchange_id']   # Bao gồm exchange_id nếu cần
            }), 200
        else:
            return jsonify({"error": "Chữ ký không được phê duyệt"}), 401

    
    def dashboard(self):
        # token = None
        # if 'Authorization' in request.headers:
        #     token = request.headers['Authorization'].split(" ")[1]  # Lấy JWT token từ header

        # if not token:
        #     return jsonify({"error": "Token is missing!"}), 403

        # try:
        #     data = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
        #     if data['role'] != 'admin':  # Kiểm tra quyền admin
        #         return jsonify({"error": "You are not authorized to access this resource"}), 403
        # except Exception as e:
        #     return jsonify({"error": "Invalid token!"}), 403

        try:
            data = self.service.get_dashboard_data()
            return jsonify({"message": "Success", "data": data}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500


exchange_controller = ExchangeController()

@app.route('/api/load_signature', methods=['POST'])
def load_signature():
    # Retrieve customer ID from form data
    customer_id = request.form.get('customerId')
    image = request.files['image'] if 'image' in request.files else None
    
    # Check if an image was uploaded
    if not image:
        return jsonify({"error": "No image uploaded"}), 400

    # Define the image file path and save the image
    image_filename = f"{customer_id}_{image.filename}"
    image_path = os.path.join(os.getenv('STORAGE_EXCHANGE_PATH'), image_filename)
    
    os.makedirs(os.path.dirname(image_path), exist_ok=True)
    image.save(image_path)

    # Prepare exchange data with customer ID and image path
    exchange_data = {
        "customer_id": customer_id,
        "imagePath": image_filename
    }
    
    # Create exchange record and return response with generated ID
    
    return exchange_controller.create(exchange_data)


@app.route('/api/verify_signature', methods=['POST'])
def verify_signature():
    # Retrieve customer_id and exchange_id from JSON payload
    customer_id = request.json.get('customer_id')
    exchange_id = request.json.get('exchange_id')
    
    # Verify signature with customer ID and exchange ID
    return exchange_controller.verify_signature(customer_id, exchange_id)


# Route cho API dashboard (chỉ cho phép admin)
@app.route('/api/admin/dashboard', methods=['GET'])
def admin_dashboard():
    return exchange_controller.dashboard()