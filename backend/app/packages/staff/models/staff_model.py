from pymongo.errors import DuplicateKeyError
from app.config.Database import db
from app.models.base_model import BaseModel

class StaffModel(BaseModel):
    def __init__(self, collection_name = "staff", mongo=db):
        super().__init__(collection_name, mongo)

    def create(self, data):
        try:
            if super().find_one({"email": data['email']}):
                return {"error": "User already exists"}, 400
            result = super().insert(data)
            print(result)
            return {"_id": str(result.inserted_id)}, 201
        except DuplicateKeyError:
            return {"error": "User already exists"}, 400

    def get_by_email(self, email): 
        user = super().find_one({"email": email})
        if user:
            user["_id"] = str(user["_id"])
            return user
        return None

    def get_by_username(self, username): 
        user = super().find_one({"username": username})
        if user:
            user["_id"] = str(user["_id"])
            return user
        return None

    # Hàm mới để lấy nhân viên theo ID employee
    def get_by_id(self, employee_id): 
        user = super().find_one({"_id": employee_id})
        if user:
            user["_id"] = str(user["_id"])
            return user
        return None

    def update(self, query, data):
        return super().update(query, data)

    # Hàm mới để xóa nhân viên theo ID employee
    def delete(self, employee_id):
        return super().delete({"_id": employee_id})
