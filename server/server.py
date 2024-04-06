from flask import Flask, request, jsonify
import utils
from flask_cors import CORS

# app = Flask(__name__)

app = Flask(__name__)
CORS(app)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': utils.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    data = request.json  # Get JSON data from request

    total_sqft = float(data['Area'])  # Adjusted key name
    location = data['Location']  # Adjusted key name
    bhk = int(data['Bhk'])  # Adjusted key name
    bath = int(data['Bath'])  # Adjusted key name

    estimated_price = utils.get_estimated_price(location, total_sqft, bhk, bath)

    return jsonify({'estimated_price': estimated_price})

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    utils.load_saved_artifacts()
    app.run()