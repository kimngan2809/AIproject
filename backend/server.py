#Flask MVC
__version__ = "1.0"
import os
from app import app
from dotenv import load_dotenv
load_dotenv()
if __name__ == '__main__':
    # Directly call environment variables without changing defaults
    host = os.environ.get('FLASK_HOST') 
    port = os.environ.get('FLASK_PORT')  
    app.run(host=host or '127.0.0.1', port=int(port) if port else 8080, debug=True)
