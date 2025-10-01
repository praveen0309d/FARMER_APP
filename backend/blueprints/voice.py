import os
import tempfile
from flask import Blueprint, request, jsonify
import speech_recognition as sr
import ollama
from pydub import AudioSegment
from pydub.utils import which

# Ensure pydub finds ffmpeg on Windows
AudioSegment.converter = which("ffmpeg")

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    """
    Receives audio file from frontend (Expo), converts to WAV,
    performs speech-to-text, sends to Ollama, returns JSON.
    """
    if "audio" not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    audio_file = request.files["audio"]
    lang = request.form.get("lang", "en")  # 'en' or 'ml'

    try:
        # Step 1: Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(audio_file.filename)[1]) as tmp_audio:
            audio_file.save(tmp_audio.name)
            tmp_audio_path = tmp_audio.name

        # Step 2: Convert to WAV for speech_recognition
        wav_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        sound = AudioSegment.from_file(tmp_audio_path)
        sound.export(wav_file.name, format="wav")
        wav_file_path = wav_file.name

    except Exception as e:
        return jsonify({"error": f"Audio conversion failed: {e}"}), 500
    finally:
        if os.path.exists(tmp_audio_path):
            os.remove(tmp_audio_path)  # Remove original safely

    # Step 3: Speech recognition
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(wav_file_path) as source:
            audio_data = recognizer.record(source)
        user_text = recognizer.recognize_google(
            audio_data,
            language="en-US" if lang == "en" else "ml-IN"
        )
    except sr.UnknownValueError:
        os.remove(wav_file_path)
        return jsonify({"error": "Could not understand audio"}), 400
    except sr.RequestError as e:
        os.remove(wav_file_path)
        return jsonify({"error": f"Speech recognition failed: {e}"}), 500
    finally:
        if os.path.exists(wav_file_path):
            os.remove(wav_file_path)

    # Step 4: Chat with Ollama
    try:
        system_prompt = "You are an agriculture assistant."
        if lang == "ml":
            system_prompt += " Reply strictly in Malayalam."
        else:
            system_prompt += " Reply strictly in English."

        response = ollama.chat(
            model="llama3",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_text}
            ],
            options={"temperature": 0.7}
        )
        reply_text = response["message"]["content"]

    except Exception as e:
        return jsonify({"error": f"Ollama failed: {e}"}), 500

    # Step 5: Return JSON
    return jsonify({
        "transcribed_text": user_text,
        "reply": reply_text
    })
