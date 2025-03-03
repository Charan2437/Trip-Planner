import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variable
GOOGLE_API_KEY = os.getenv('GEMINI_API_KEY_PLANNER')

genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE"
    },
]

model = genai.GenerativeModel(
    model_name="gemini-2.0-pro-exp-02-05",
    generation_config=generation_config,
    safety_settings=safety_settings
)

def create_chat_session():
    chat = model.start_chat(history=[])
    # Send the system prompt as the first message
    chat.send_message("""You are an AI trip planner. Your role is to generate a JSON object representing a detailed trip itinerary based on the provided inputs. 
    The JSON object should follow this format:
    {
      "Day1": {
        "name": "Day1",
        "items": [
          {
            "content": "example2name",
            "id": "example2id",
            "lng": example2longitude,
            "lat": example2latitude,
            "description": "This is the info about this place",
            "Best_time_to_visit": "6 am-6 pm",
            "Famous_for": "This place is famous for"
          }
        ]
      }
    }""")
    return chat