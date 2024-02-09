from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

# Initialize Flask App
app = Flask(__name__)

# Initialize Firestore DB
db = firestore.client()
result = db.collection('employee_details')

def get_employee_details():
    if request.method == "GET":
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
        
    if request.method == 'PUT':
        try:
            data = request.get_json()

            # Add the data to the database
            result.document(data['id']).set(data)

            # Return a success response
            return jsonify({'success': True})
        
        except Exception as e:
            return f"An Error Occured: {e}"
        
def employee_delete(id):
    if request.method == 'DELETE':
        try:
            result.document(id).delete()
            return jsonify({'success': True})
        except Exception as e:
            return f"An Error Occured: {e}"