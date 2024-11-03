import os
from bson import ObjectId
from app.services.base_service import BaseService
from ..models.exchange_model import ExchangeModel
from app.utils.signature_processor import SignatureProcessor
class ExchangeService(BaseService):
    def __init__(self, model = ExchangeModel(), session = None):
        super().__init__(model, session)
        self.signature_processor = SignatureProcessor()
    def create(self, data):
        id = self.model.create(data) 
        return id
    def process(self, customer_id, exchange_id):
        # Lấy ảnh chữ ký mẫu từ collection customer
        customer = self.model.find_customerId(customer_id)
        if not customer: 
            return False
        print(exchange_id)
        exchange = self.model.find_one({"_id": ObjectId(exchange_id)})
        print (exchange)
        
        real_signature_path = os.path.join(os.getenv('STORAGE_PATH'), customer['imagePath'])
        sign_path = os.path.join(os.getenv('STORAGE_EXCHANGE_PATH'), exchange['imagePath'])
        # Xử lý ảnh input
        input_img = self.signature_processor.preprocess_image(sign_path)
        template_img = self.signature_processor.preprocess_image(real_signature_path)
        print (sign_path)
        print (real_signature_path)
        # Verify chữ ký
        is_verified, similar = self.signature_processor.verify_signature(input_img, template_img)
        print("độ giống nhau: ", similar)
        print("is_verified:", is_verified)

        self.model.update_status(exchange["_id"], is_verified, similar)        
        # Trả về các giá trị đã được chuyển đổi
        similar_value = float(similar)
        return {
            "is_verified": bool(is_verified),  # Chuyển đổi bool_ thành bool
            "similar":similar_value,                 # Giả sử similar đã là kiểu dữ liệu hợp lệ
            "exchange_id": str(exchange["_id"]) # Trả về exchange_id như một chuỗi
}

    def get_dashboard_data(self):
        try:
            # Lấy tổng số lượng chữ ký thật và giả (dữ liệu mẫu)
            verified_signatures = self.model.collection.count_documents({"is_verified": True})
            forged_signatures = self.model.collection.count_documents({"is_verified": False})

            # Lấy khách hàng có chữ ký được xác thực nhiều nhất
            top_customer = self.model.collection.aggregate([
                {"$group": {"_id": "$customer_id", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 10}
            ])

            result = {
                "verified_signatures": verified_signatures,
                "forged_signatures": forged_signatures,
                "top_customer": list(top_customer)  # Chuyển kết quả sang list
            }
            return result
        except Exception as e:
            raise e