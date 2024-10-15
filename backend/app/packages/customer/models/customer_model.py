from pymongo.errors import DuplicateKeyError
from app.models.base_model import *
from app.config.Database import db

class CustomerModel(BaseModel):
    def __init__(self, mongo = db):
        super().__init__(collection_name='customer', mongo=mongo)
    def create(self,data):
        try:
            if super().find_one({"phoneNumber":data['phoneNumber']}):
                return{"error":"User already exist"},400
            result = super().insert(data)
            print (result)
            return {"_id": str(result.inserted_id)},201
        except DuplicateKeyError:
            return{"error":"Customer already exists"},400
    def get_by_numberPhone(self,numberPhone):
        customer=super().find_one({"phoneNumber":['phoneNumber']})
        if customer:
            customer["_id"]=str(customer["_id"])
            return customer
    def update(self, query, data):
        return super().update(query, data)
                                  


