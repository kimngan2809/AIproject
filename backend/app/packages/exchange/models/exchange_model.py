from app.config.Database import db
from app.models.base_model import BaseModel

class ExchangeModel(BaseModel):
    def __init__(self, collection_name='exchange', mongo=db):
        super().__init__(collection_name, mongo)
    def find_customerId(self, id):
        return db['customer'].find_one({"customerId": id})
    def create(self, data):
        result = super().insert(data)
        return str(result.inserted_id)
    def find_one(self, query):
        return super().find_one(query)
    def update_status(self, id, is_verified, similar):
        update_data = {"is_verified": bool(is_verified), "similarity": float(similar)}
        return super().update({"_id": id}, update_data)        