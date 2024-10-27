from pymongo.errors import DuplicateKeyError
from app.models.base_model import *
from app.config.Database import db

class CustomerModel(BaseModel):
    def __init__(self, mongo=db):
        super().__init__(collection_name='customer', mongo=mongo)

    def create(self, data):
        try:
            if super().find_one({"phoneNumber": data['phoneNumber']}):
                return {"error": "User already exist"}, 400
            result = super().insert(data)
            return {"_id": str(result.inserted_id)}, 201
        except DuplicateKeyError:
            return {"error": "Customer already exists"}, 400

    def get_by_numberPhone(self, numberPhone):
        customer = super().find_one({"phoneNumber": numberPhone})
        if customer:
            customer["_id"] = str(customer["_id"])
            return customer
        return None

    # Hàm mới để tìm khách hàng theo ID
    def get_by_id(self, customer_id):
        customer = super().find_one({"_id": customer_id})
        if customer:
            customer["_id"] = str(customer["_id"])
            return customer
        return None

    def update(self, query, data):
        return super().update(query, data)

    # Hàm mới để xóa khách hàng
    def delete(self, customer_id):
        return super().delete({"_id": customer_id})
    def get_all(self):
         # Retrieve all documents from the collection
        documents = list(self.collection.find({}))
        
        # Convert MongoDB documents to JSON serializable format if needed
        for doc in documents:
            doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
        
        return documents