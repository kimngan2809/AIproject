from abc import abstractmethod
from app.config.Database import db
from app.packages.staff.models.staff_model import StaffModel

class AuthModel(StaffModel): 
    def __init__(self, mongo=db):
        super().__init__(mongo=mongo)
        
    @abstractmethod
    def get_authen_method(self, email):
        pass 