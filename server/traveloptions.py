import os
import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyBiLk9mTBUH29BbX1rpmtjfxVkE0AamuRg"

genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)