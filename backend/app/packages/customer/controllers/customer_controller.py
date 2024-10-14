
from flask import request, jsonify
from ..services.customer_service import CustomerService
from app.controllers.base_controller import BaseController
from app import app

class UserController(BaseController): 
    def __init__(self, service = CustomerService()): 
        super().__init__(service)
    def create(self, data):
        return super().create(data)
    
user_controller = CustomerService()
@app.route('/api/addcustomer',method=['POST'])
def create_user():
    data=request.json
    if not data or 'firstName' not in data or 'lastName' not in data or 'phoneNumber' not in data or 'customerId' not in data or 'image' not in data:
        return jsonify({"error":"Missing required fields"}),400
    result=user_controller.create(data)
    return result
