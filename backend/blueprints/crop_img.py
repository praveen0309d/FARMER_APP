# paddy_bp.py
import os
import glob
import torch
from flask import Flask, request, jsonify,Blueprint
from PIL import Image
from transformers import ViTForImageClassification, ViTImageProcessor
import ollama

# Flask paddy_bp
paddy_bp = Blueprint('crop', __name__)

# Model setup
MODEL_CHECKPOINT = "google/vit-base-patch16-224-in21k"
FINETUNED_OUTPUT_DIR = r"backend\vit-paddy-disease"
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load model + processor once
latest_checkpoint = max(glob.glob(os.path.join(FINETUNED_OUTPUT_DIR, "checkpoint-*")), key=os.path.getctime)
image_processor = ViTImageProcessor.from_pretrained(MODEL_CHECKPOINT)
model = ViTForImageClassification.from_pretrained(latest_checkpoint).to(device)
id2label = model.config.id2label

def predict(image_path):
    """Run prediction on image."""
    image = Image.open(image_path).convert("RGB")
    inputs = image_processor(images=image, return_tensors="pt").to(device)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
    probs = torch.nn.functional.softmax(logits, dim=-1)[0]
    confidences = {id2label[i]: float(score) for i, score in enumerate(probs)}
    return confidences

def chat_with_ollama(disease, lang="en"):
    """Get treatment advice from Ollama."""
    system_prompt = "You are an agriculture assistant. Provide solutions and preventative measures for plant diseases."
    if lang == "ta":
        system_prompt += " Reply strictly in Tamil."
    elif lang == "ml":
        system_prompt += " Reply strictly in Malayalam."
    else:
        system_prompt += " Reply strictly in English."

    try:
        response = ollama.chat(
            model="llama3",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"The identified paddy disease is '{disease}'. Provide treatment & prevention advice."}
            ],
        )
        return response["message"]["content"]
    except Exception as e:
        return f"Ollama error: {e}"

@paddy_bp.route("/predict", methods=["POST"])
def api_predict():
    try:
        img = request.files["image"]
        lang = request.form.get("lang", "en")  # default English

        # Save image
        img_path = os.path.join("uploads", img.filename)
        os.makedirs("uploads", exist_ok=True)
        img.save(img_path)

        # Run ML prediction
        scores = predict(img_path)
        top_pred = max(scores.items(), key=lambda x: x[1])
        disease, confidence = top_pred

        # Get advice from Ollama
        advice = chat_with_ollama(disease, lang)

        return jsonify({
            "disease": disease,
            "confidence": round(confidence, 4),
            "advice": advice
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


