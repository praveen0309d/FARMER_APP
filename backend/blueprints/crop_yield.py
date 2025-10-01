from flask import Blueprint, request, jsonify
import pandas as pd
import joblib

# Define Blueprint
crop_bp = Blueprint('yield', __name__)

# Load model and encoders
model = joblib.load(r'C:\Users\prave\FARMER_APP\backend\yieldfiels\xgboost_crop_yield_model.joblib')
le_state = joblib.load(r'C:\Users\prave\FARMER_APP\backend\yieldfiels\le_state.joblib')
le_district = joblib.load(r'C:\Users\prave\FARMER_APP\backend\yieldfiels\le_district.joblib')


@crop_bp.route('/predict', methods=['POST'])
def predict_crop_yield():
    try:
        data = request.json

        year = int(data['year'])
        state = data['state']
        district = data['district']
        rain_annual = float(data['rain_annual'])
        rain_jjas = float(data['rain_jjas'])
        temp_annual = float(data['temp_annual'])
        temp_junsep = float(data['temp_junsep'])

        # Encode
        try:
            state_encoded = le_state.transform([state])[0]
            district_encoded = le_district.transform([district])[0]
        except ValueError:
            return jsonify({"error": "State or District not found in training data!"}), 400

        # Create DataFrame
        input_df = pd.DataFrame({
            'Year': [year],
            'State': [state_encoded],
            'District': [district_encoded],
            'Rain_Annual': [rain_annual],
            'Rain_JJAS': [rain_jjas],
            'Temp_Annual': [temp_annual],
            'Temp_JunSep': [temp_junsep]
        })

        # Predict
        predicted_yield = model.predict(input_df)[0]

        return jsonify({
            "predicted_yield": round(float(predicted_yield), 2),
            "unit": "kg/ha"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
