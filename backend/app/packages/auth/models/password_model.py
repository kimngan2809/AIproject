from app.config.Database import db
from .auth_model import AuthModel


class PasswordModel(AuthModel):
    def __init__(self, mongo=db):
        super().__init__(mongo)
    
    def get_authen_method(self, email):
        user = super().get_by_email(email)
        if user: 
            return user["password"]
        else:
            return None
