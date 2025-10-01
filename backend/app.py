from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from blueprints.logsign import logsign
from blueprints.voice import chat_bp
from blueprints.crop_yield import crop_bp
from blueprints.crop_img import paddy_bp
from blueprints.price_predict_bp import price_predict_bp
from blueprints.agri_chat_bp import agri_chat_bp

from flask_cors import CORS
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/farmer_app"
app.config["JWT_SECRET_KEY"] = "your_secret_key"

mongo = PyMongo(app)
app.mongo = mongo  # 👈 attach mongo to app so blueprints can use current_app.mongo
jwt = JWTManager(app)

app.register_blueprint(logsign, url_prefix="/api")
app.register_blueprint(chat_bp, url_prefix="/api")
app.register_blueprint(crop_bp, url_prefix="/api/yield")
app.register_blueprint(paddy_bp, url_prefix="/api")
app.register_blueprint(price_predict_bp, url_prefix="/api")
app.register_blueprint(agri_chat_bp, url_prefix="/api")

CORS(app)
@app.route("/")
def home():
    return {"message": "MongoDB Backend running!"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
