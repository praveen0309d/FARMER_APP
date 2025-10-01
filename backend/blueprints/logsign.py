from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from datetime import timedelta

logsign = Blueprint("auth", __name__)

# ✅ Signup Route (stores password in plain text)
@logsign.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "email", "phone", "password")):
        return jsonify({"error": "Missing required fields"}), 400

    users = current_app.mongo.db.users

    if users.find_one({"email": data["email"]}):
        return jsonify({"error": "User already exists"}), 400

    # Store password in plain text (NOT recommended for production!)
    users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "phone": data["phone"],
        "state": data["state"],
        "password": data["password"]  # Storing as plain text
    })

    token = create_access_token(identity=data["email"], expires_delta=timedelta(hours=24))

    return jsonify({
        "message": "Signup successful",
        "user": {"name": data["name"], "email": data["email"], "phone": data["phone"]},
        "token": token
    }), 201


# ✅ Login Route (compares plain text passwords)
@logsign.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ("email", "password")):
        return jsonify({"error": "Missing email or password"}), 400

    if not isinstance(data["password"], str):
        return jsonify({"error": "Password must be a string"}), 400

    users = current_app.mongo.db.users
    user = users.find_one({"email": data["email"]})

    # Compare plain text passwords directly
    if not user or user["password"] != data["password"]:
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=user["email"], expires_delta=timedelta(hours=24))

    return jsonify({
        "message": "Login successful",
        "user": {"name": user["name"], "email": user["email"], "phone": user["phone"]},
        "token": token
    }), 200