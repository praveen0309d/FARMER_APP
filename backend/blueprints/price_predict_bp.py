from flask import Blueprint, request, jsonify
import pandas as pd
import numpy as np
import joblib
from datetime import datetime

# -----------------------------
# Load model and encoders
# -----------------------------
model = joblib.load(r"C:\Users\prave\FARMER_APP\backend\maket_price\lightgbm_model.pkl")
label_encoders = joblib.load(r"C:\Users\prave\FARMER_APP\backend\maket_price\label_encoders.pkl")

# -----------------------------
# Safe transform for unseen categories
# -----------------------------
def safe_transform(encoder, value):
    if value in encoder.classes_:
        return encoder.transform([value])[0]
    else:
        # fallback to most frequent class
        return np.argmax(np.bincount(encoder.transform(encoder.classes_)))

# -----------------------------
# Prediction function
# -----------------------------
def predict_price(data):
    date_obj = datetime.strptime(data['date'], "%Y-%m-%d")
    day_of_year = date_obj.timetuple().tm_yday

    encoded_data = {
        'day_of_year': day_of_year,
        'state': safe_transform(label_encoders['state'], data['state']),
        'district': safe_transform(label_encoders['district'], data['district']),
        'market': safe_transform(label_encoders['market'], data['market']),
        'commodity': safe_transform(label_encoders['commodity'], data['commodity']),
        'variety': safe_transform(label_encoders['variety'], data['variety']),
    }

    new_data_point = pd.DataFrame([encoded_data]).reindex(columns=model.feature_name_, fill_value=0)
    predicted_price = model.predict(new_data_point)[0]
    return predicted_price

# -----------------------------
# Create Blueprint
# -----------------------------
price_predict_bp = Blueprint("price_predict_bp", __name__)

@price_predict_bp.route('/marketpredict', methods=['POST'])
def predict():
    try:
        # Force JSON parsing to avoid None
        data = request.get_json(force=True)
        print("Received JSON:", data)  # debug: log incoming data
        price = predict_price(data)
        return jsonify({"predicted_price": round(price, 2)})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400
