import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input
from sklearn.metrics.pairwise import cosine_similarity
import os

## tải đưa đúng đường dẫn
vgg_model = tf.keras.models.load_model('saved_models/vgg16_finetuned_model.h5')
feature_extractor = tf.keras.Sequential(vgg_model.layers[:-1])


print(vgg_model)


def load_image(image_path):
    '''Return the image in the format required by VGG16 model.'''
    img = image.load_img(image_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    return x


def cosine_similarity_fn(feature_src, feature_input):
    '''Returns the cosine similarity between the two signature images.'''
    score = cosine_similarity(feature_src, feature_input)[0][0]

       
    return score

image1 = load_image ('./01_068.png')
image2 = load_image ('./01_0113068.PNG')

f1 = feature_extractor.predict(image1)
f2 = feature_extractor.predict(image2)
print (f1)
print ("score:", cosine_similarity_fn(f1,f2))
