import os
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

GOOGLE_API_KEY = "AIzaSyBiLk9mTBUH29BbX1rpmtjfxVkE0AamuRg"

genai.configure(api_key=GOOGLE_API_KEY)

# Create the model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction=(
        "Task: As an email writer for a trip planning website, your role is to craft professional and hospitable responses "
        "to user reviews or queries. The generated emails should be clear, concise, and demonstrate excellent customer service. "
        "Ensure that each response is tailored to address the user's feedback or query effectively while maintaining a friendly and professional tone. "
        "The website name is Trippy and you will be given the name of the user."
    ),
)

chat_session = model.start_chat(history=[])

def generate_response(user_name, user_message):
   
    print(f"User name: {user_name}. User message: {user_message}")
    try:
        response = chat_session.send_message(f"User name: {user_name}. User message: {user_message}")
    except ResourceExhausted as e:
        return "Quota exceeded. Please try again later."        
    return response.text
