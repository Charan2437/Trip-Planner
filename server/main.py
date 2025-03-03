from flask import Flask, jsonify, request
from flask_cors import CORS
from chat_bot import bot_model
from planner import create_chat_session
from google.api_core.exceptions import ResourceExhausted

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return jsonify({"message": "Hello, World!"})

@app.route("/api/user")
def return_home():
    return jsonify({"message": "Welcome to the home page!"})

@app.route("/api/chatbot", methods=['POST'])
def chatbot():
    user_input = request.json.get('message')
    print(user_input)
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = bot_model.send_message(user_input)
        if response is None:
            return jsonify({"error": "Failed to get response from chatbot"}), 500
        print(response.text)
        return jsonify({"response": response.text})
    except ResourceExhausted:
        return jsonify({
            "error": "API quota has been exhausted. Please try again in a few moments."
        }), 429
    except Exception as e:
        print(f"Error in chatbot: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@app.route('/api/generate-itinerary', methods=['POST'])
def generate_itinerary():
    data = request.json
    destination = data.get('destination')
    preferences = data.get('preferences')
    number_of_days = data.get('number_of_days')
    budget = data.get('budget')

    if not destination or not preferences or not number_of_days or not budget:
        return jsonify({"error": "Please provide destination, preferences, number_of_days, and budget"}), 400

    input_message = f"""
    "destination": "{destination}",
    "preferences": {preferences},
    "number_of_days": {number_of_days},
    "budget": {budget}
    """

    try:
        chat_session = create_chat_session()
        response = chat_session.send_message(input_message)
        return jsonify(response.text)
    except ResourceExhausted:
        return jsonify({
            "error": "API quota has been exhausted. Please try again in a few moments."
        }), 429
    except Exception as e:
        print(f"Error in generate_itinerary: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == "__main__":
    app.run(host='127.0.0.1', debug=True, port=5000)
