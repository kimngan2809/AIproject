import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
class SignatureProcessor:
    def __init__(self):
        # Load các model
        self.verification_model = tf.keras.models.load_model('app/model/vgg16_finetuned_model.h5')
        

    def preprocess_image(self, img_path):
        # Xử lý ảnh đầu vào
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        return img_array / 255.0

    def verify_signature(self, img1_array, img2_array):
        # So sánh 2 chữ ký
        features1 = self.verification_model.predict(img1_array)
        features2 = self.verification_model.predict(img2_array)
        
        # Tính cosine similarity
        similarity = np.dot(features1.flatten(), features2.flatten()) / (
            np.linalg.norm(features1.flatten()) * np.linalg.norm(features2.flatten())
        )
        
        # Trả về True nếu similarity > threshold
        return similarity > 0.85, similarity