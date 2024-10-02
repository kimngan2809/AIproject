#Flask MVC


__version__ = "1.0"


from app import app

if __name__ == '__main__':
    app.run(host="localhost", port=8800, debug=True)
