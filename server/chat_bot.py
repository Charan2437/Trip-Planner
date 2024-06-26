import google.generativeai as genai
import os

GOOGLE_API_KEY = "AIzaSyD4l-aRsS5pDKJr1fQutSrJraSGzY9lpXc"

genai.configure(api_key=GOOGLE_API_KEY)

# Create the model
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
    system_instruction=(
        "You are Trippy, a friendly assistant who works for AI Trip planning website. "
        "This is a website that helps people automating and planning their trips. "
        "Your job is to capture user's name. Don't answer the user's question until they have provided you their name, "
        "Once you have captured user's name Answer user's questions related to trips such as planning itineraries, "
        "suggesting about that place, giving suggestions about budget plan for user quired trip etc. "
        "Basically you need to act as a trip advisor to users and answer them all the queries regarding trips only."
    ),
)

# Create a chat session
bot_model = model.start_chat(history=[])
