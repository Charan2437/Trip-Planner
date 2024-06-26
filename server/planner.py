import google.generativeai as genai
import os

GOOGLE_API_KEY = "AIzaSyD4l-aRsS5pDKJr1fQutSrJraSGzY9lpXc"

genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction="""
    You are an AI trip planner. Your role is to generate a JSON object representing a detailed trip itinerary based on the provided inputs. 
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
          },
          {
            "content": "example3name",
            "id": "example3id",
            "lng": example3longitude,
            "lat": example3latitude,
            "description": "This is the info about this place",
            "Best_time_to_visit": "6 am-6 pm",
            "Famous_for": "This place is famous for"
          }
        ]
      },
      "Day2": {
        "name": "Day2",
        "items": []
      },
      "Day3": {
        "name": "Day3",
        "items": []
      }
    }

    Inputs:
    Destination: The place the person is traveling to.
    Preferences: Interests and activities preferred by the person (e.g., nature, adventure, historical sites, relaxation).
    Number of Days: The duration of the trip in days.
    Budget: The overall budget for the trip.
    Outputs:
    A JSON object representing the trip itinerary, structured by days.
    Each day contains a list of items, with each item representing a place or activity.
    Item Details:
    content: Name of the place or activity.
    id: Unique identifier for the place or activity.
    lng: Longitude of the place.
    lat: Latitude of the place.
    description: A brief description of the place or activity.
    Best_time_to_visit: Recommended visiting hours.
    Famous_for: What the place is known for.
    Instructions:
    Select places and activities that align with the person's preferences.
    Ensure the itinerary is balanced and feasible within the given number of days and budget.
    Provide detailed information for each place, including its description, best time to visit, and what it is famous for.
    """,
)

def create_chat_session():
    return model.start_chat(history=[])
