from flask import Blueprint, request, jsonify
import urllib3
import ollama
from langdetect import detect
from gtts import gTTS
import playsound
import os

# ------------------ Blueprint ------------------
agri_chat_bp = Blueprint("agri_chat_bp", __name__)

# ------------------ Internet Check ------------------
def is_online():
    try:
        urllib3.PoolManager().request('GET', 'http://www.google.com', timeout=2.0)
        return True
    except Exception:
        return False

# ------------------ Agriculture Filter ------------------
agri_keywords = [
    "crop", "soil", "plant", "fertilizer", "pesticide", "seed",
    "harvest", "farming", "agriculture", "irrigation",
    "livestock", "weather", "farm", "mango", "rice", "paddy",
    "wheat", "cotton", "vegetable", "fruit", "disease", "insect"
]

def is_agriculture_related(text: str) -> bool:
    text_lower = text.lower()
    return any(word in text_lower for word in agri_keywords)

# ------------------ Tiny Offline LLaMA ------------------
def chat_tiny_llama(prompt, model="agri-llama"):
    try:
        if not is_agriculture_related(prompt):
            return "⚠ Sorry, I can only answer agriculture-related questions in offline mode."
        response = ollama.chat(model=model, messages=[{"role": "user", "content": prompt}])
        return response['message']['content']
    except Exception as e:
        return f"⚠ Error using tiny LLaMA: {str(e)}"

# ------------------ LLaMA3 Online Chat ------------------
def chat_llama3(prompt, lang):
    system_prompts = {
        "en": "You are a helpful agriculture assistant. Only answer agriculture-related questions. "
              "If the user asks a non-agriculture question, say 'I can only answer agriculture-related questions.' Respond in English.",
        "ta": "நீங்கள் ஒரு விவசாய உதவியாளர். விவசாயம் தொடர்பான கேள்விகளுக்கு மட்டும் பதிலளிக்கவும். "
              "விவசாயம் அல்லாத கேள்விகள் கேட்கப்பட்டால், 'நான் விவசாயம் தொடர்பான கேள்விகளுக்கு மட்டுமே பதிலளிக்கலாம்' என்று சொல்லவும். தமிழில் பதிலளிக்கவும்.",
        "hi": "आप एक सहायक कृषि सहायक हैं। केवल कृषि संबंधी प्रश्नों का उत्तर दें। यदि उपयोगकर्ता गैर-कृषि प्रश्न पूछे, तो कहें 'मैं केवल कृषि संबंधी प्रश्नों का उत्तर दे सकता हूँ।' हिंदी में उत्तर दें।"
    }
    system_prompt = system_prompts.get(lang, system_prompts["en"])

    try:
        response = ollama.chat(model="Agri-LLaMA3", messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ])
        reply = response["message"]["content"]
        return reply
    except Exception as e:
        return f"⚠ Error using LLaMA3: {str(e)}"

# ------------------ API Route ------------------
@agri_chat_bp.route("/agri_chat", methods=["POST"])
def agri_chat():
    data = request.json
    user_input = data.get("input", "").strip()
    lang = data.get("lang", "en")
    online = data.get("online", True)

    if not user_input:
        return jsonify({"reply": "⚠ No input provided"}), 400

    # Online or Offline decision
    if online:
        reply = chat_llama3(user_input, lang)
    else:
        reply = chat_tiny_llama(user_input)

    return jsonify({"reply": reply})
