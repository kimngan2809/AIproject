import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
from tensorflow.keras import backend as K

def manhattan_distance_func(tensors):
    return K.abs(tensors[0] - tensors[1])
class SignatureProcessor:
    def __init__(self):
        # Load các model

        self.verification_model = tf.keras.models.load_model('app/model/signetmodel')

    def preprocess_image(self, img_path):
        test_image = Image.open(img_path)
        test_image = test_image.resize((112, 112))
        test_image = img_to_array(test_image)
        test_image = np.expand_dims(test_image, axis=0)
        test_image = test_image.astype('float32')
        return test_image


    def verify_signature(self, img1_array, img2_array):
        # So sánh 2 chữ ký
        # Perform inference on the test images
        prediction = self.verification_model.predict([img1_array, img2_array])

        # Print the similarity score
        similarity_score = prediction[0][0]
        print('Similarity Score:', similarity_score)
                
        # Trả về True nếu similarity > threshold
        return similarity_score < 0.5, similarity_score