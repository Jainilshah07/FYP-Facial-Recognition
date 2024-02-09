from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
# Initialize Flask App
app = Flask(__name__)
# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
result = db.collection('attendance')

# Endpoint to get all elements in the attendance collection
@app.route('/get_attendance', methods=['GET'])
def get_attendance():
    try:
        # Get all documents in the "attendance" collection
        documents = result.stream()

        # Create a dictionary to store the results
        result_dict = {}

        # Iterate through each document
        for doc in documents:
            # Extract data from the document
            data = doc.to_dict()
            employee_id = doc.id  # Employee ID is the document ID

            # Add the data to the result dictionary
            result_dict[employee_id] = data

        return jsonify(result_dict), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/post_attendance', methods=['POST'])
def post_attendance():
    try:
        id = request.json['id']
        result.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


if __name__ == '__main__':
    app.run(debug=True)