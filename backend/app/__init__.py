from flask import Flask
from flask_cors import CORS
app = Flask("app")
CORS(app)

from app.controllers import *
from app.packages.auth.controllers import auth_controller
from app.packages.staff.controllers import staff_controller
from app.packages.customer.controllers import customer_controller
from app.packages.exchange.controllers import exchange_controller

