from flask import request, jsonify
from app.controllers.base_controller import BaseController
from ..services.staff_service import StaffService

from app import app

class StaffController(BaseController):
    def __init__(self, service=StaffService()):
        super().__init__(service)
    def create(self, data):
        return super().create(data)
    


user_controller = StaffController()

@app.route('/api/user/signup', methods=['POST'])
def create_user():
    data = request.json
    if not data or 'email' not in data or 'password' not in data:  # Validate data
        return jsonify({"error": "Missing required fields"}), 400

    result = user_controller.create(data)
    return result
