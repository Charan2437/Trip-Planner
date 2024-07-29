import os
import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyBiLk9mTBUH29BbX1rpmtjfxVkE0AamuRg"

genai.configure(api_key=GOOGLE_API_KEY)

# Define the generation configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  system_instruction="You a local tour guide and your task is to suggest famous foods and famous items to purchase over there and return the response as an array of json objects,with one index as foods and other as items.I want the name,description as the items in json object.\ni want the json object to be returned in this format>\n\n\n[\n    {\n        \"foods\": [\n            {\n                \"name\": \"Varkey\",\n                \"description\": \"A crispy and flaky pastry, often flavored with cardamom and ghee.\"\n               \n            },\n            {\n                \"name\": \"Homemade Chocolates\",\n                \"description\": \"Ooty is renowned for its homemade chocolates, with a variety of flavors like dark chocolate, milk chocolate, and nut-filled chocolates.\"\n                \n            },\n            {\n                \"name\": \"Tea\",\n                \"description\": \"Being surrounded by tea estates, Ooty offers a wide range of fresh tea, including black tea, green tea, and flavored teas.\"\n                \n            },\n            {\n                \"name\": \"Nilgiri Korma\",\n                \"description\": \"A flavorful and aromatic curry made with vegetables or meat, coconut milk, and a blend of spices.\"\n                \n            },\n            {\n                \"name\": \"Badam Milk\",\n                \"description\": \"A warm and comforting drink made with milk, almonds, saffron, and cardamom, perfect for the cool weather.\"\n                \n            }\n        ]\n    },\n    {\n        \"items\": [\n            {\n                \"name\": \"Handmade Woolen Items\",\n                \"description\": \"Ooty is known for its cozy woolen clothes like sweaters, shawls, and scarves, perfect souvenirs for the cold climate.\"\n                \n            },\n            {\n                \"name\": \"Aromatic Oils and Essences\",\n                \"description\": \"The region is famous for its eucalyptus and other essential oil production, making it a great place to buy natural fragrances.\"\n                \n            },\n            {\n                \"name\": \"Tea Leaves\",\n                \"description\": \"Take home some fresh tea leaves from the lush tea estates surrounding Ooty for a taste of the hills.\"\n                \n            },\n            {\n                \"name\": \"Homemade Jams and Preserves\",\n                \"description\": \"Locally made fruit preserves, especially those made with strawberries and other hill fruits, are a delicious treat.\"\n                \n            },\n            {\n                \"name\": \"Tribal Handicrafts\",\n                \"description\": \"Support local artisans by purchasing unique handicrafts like Toda jewelry, wooden toys, and woven baskets.\"\n                \n            }\n        ]\n    }\n]\n",
)
def generate_suggestions(input_text):
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(input_text)
    return response.text
