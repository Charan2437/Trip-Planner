import os
import ssl
import time
from dotenv import load_dotenv
from google.api_core import retry
from google.api_core.exceptions import ResourceExhausted

ssl._create_default_https_context = ssl._create_unverified_context

import google.generativeai as genai

# Load environment variables
load_dotenv()

# Get API key from environment variable
GOOGLE_API_KEY = os.getenv('GEMINI_API_KEY_CHAT')

genai.configure(api_key=GOOGLE_API_KEY)

# Create the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192
}

class ChatBot:
    def __init__(self):
        self.model = genai.GenerativeModel(
            model_name="gemini-2.0-flash-exp",
            generation_config=generation_config
        )
        self.chat = self.model.start_chat(history=[])
        self._initialize_chat()
    
    def _initialize_chat(self):
        self.send_message(
            "You are Trippy, a friendly assistant who works for AI Trip planning website. "
            "This is a website that helps people automating and planning their trips. "
            "Your job is to capture user's name. Don't answer the user's question until they have provided you their name, "
            "Once you have captured user's name Answer user's questions related to trips such as planning itineraries, "
            "suggesting about that place, giving suggestions about budget plan for user quired trip etc. "
            "Basically you need to act as a trip advisor to users and answer them all the queries regarding trips only."
        )
    
    @retry.Retry(predicate=retry.if_exception_type(ResourceExhausted))
    def send_message(self, message):
        try:
            response = self.chat.send_message(message)
            return response
        except ResourceExhausted as e:
            print(f"API quota exhausted. Retrying with exponential backoff...")
            raise
        except Exception as e:
            print(f"Error sending message: {str(e)}")
            return None

# Create a singleton instance
bot_model = ChatBot()

# Send the system instruction as the first message
bot_model.send_message(
    "You are Trippy, a friendly assistant who works for AI Trip planning website. "
    "This is a website that helps people automating and planning their trips. "
    "Your job is to capture user's name. Don't answer the user's question until they have provided you their name, "
    "Once you have captured user's name Answer user's questions related to trips such as planning itineraries, "
    "suggesting about that place, giving suggestions about budget plan for user quired trip etc. "
    "Basically you need to act as a trip advisor to users and answer them all the queries regarding trips only."
)
