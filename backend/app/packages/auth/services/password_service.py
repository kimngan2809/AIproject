import jwt
import os
from datetime import datetime, timedelta
from app.config.Hash import *
from .auth_service import AuthService
from ..models.password_model import PasswordModel
class PasswordService(AuthService):
    def __init__(self):
        super().__init__(model=PasswordModel())
    def authenticate(self, data):
        user = self.model.get_by_username(username=data["identifier"])
        if not user:
            raise Exception('Email không tồn tại')
        # Kiểm tra mật khẩu
        hash_util = Hash()
        if not hash_util.checkHash(self.model.get_authen_method(user["email"]), data["password"]):
            raise Exception('Mật khẩu không đúng')

          # Create JWT token payload
        token_payload = {
            'email': user['email'],
            'exp': datetime.utcnow() + timedelta(hours=1)  # Expires in 1 hour
        }

        # Add role to token if present
        if 'role' in user:
            token_payload['role'] = user['role']

        # Create JWT token
        token = jwt.encode(token_payload, os.getenv('JWT_SECRET_KEY'), algorithm="HS256")

        # Create user_data
        user_data = {
            "username": user['username']
        }

        # Add role to user_data if present
        if 'role' in user:
            user_data['role'] = user['role']

        return token, user_data

        