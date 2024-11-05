AI PROJECT - APPLICATION OF HANDWRITTEN SIGNATURE AUTHENTICATION
1. Model AI
- This project use data from Kaggle with dataset <https://www.kaggle.com/datasets/robinreni/signature-verification-dataset>
- Also we use the siamese network from a <https://www.kaggle.com/code/suraj520/siamese-network-100-acc-know-train-infer>
- This model we trained over 6 hours and received a surpassed expectation with acc to 0.9909 for 5 epochs
- You can see our note book <https://github.com/kimngan2809/AIproject/blob/main/siamese_network_custome.ipynb>
2. Document
- We haved organized the document of this project in Google Drive. You can access through:  <[https://drive.google.com/drive/folders/1rSZEAbh-4uKK3SnPtMLrqqZo4lyoDmVV?usp=drive_link](https://drive.google.com/drive/folders/1pRssYalgO3rn2UfDVHnIisqg6tAGrg1Q?usp=drive_link)>
3. Architecture
- Project has backend, frontend, image, db
  + Backend built with flask and MVC architecture
  + Frontend built with javascript
  + image: sign_images saved the signature of customer, sign_images_exchanges saved signature that had verified in web.
  + mongodb: staff, exchange, and customer 
4. Run
- This project use python 3.10. So you need a enviroment like conda, this enviroment can run the project.
- Install the requirement.txt
- cd frontend -> npm run dev -> access localhost
- cd backend -> python server.py
- organize mongodb and open it
