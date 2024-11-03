import tensorflow as tf 
import numpy as np
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array

loaded_model = tf.keras.models.load_model('saved_models/signetmodel')
print (loaded_model)

test_image1 = Image.open('01_068.png')
test_image1 = test_image1.resize((112, 112))
test_image1 = img_to_array(test_image1)
test_image1 = np.expand_dims(test_image1, axis=0)
test_image1 = test_image1.astype('float32')

test_image2 = Image.open('01_0113068.PNG')
test_image2 = test_image2.resize((112, 112))
test_image2 = img_to_array(test_image2)
test_image2 = np.expand_dims(test_image2, axis=0)
test_image2 = test_image2.astype('float32')

# Perform inference on the test images
prediction = loaded_model.predict([test_image1, test_image2])

print(prediction)