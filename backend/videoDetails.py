from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

# Initialize Flask App
app = Flask(__name__)

# Initialize Firestore DB
db = firestore.client()
result = db.collection('Videos')

def get_video(id):
    if request.method == "GET":
        try:
            # Get all documents in the "Videos" collection
            documents = result.stream()
            # Create a list to store the results
            result_list = []
            
            # Iterate through each document
            for doc in documents:
                # Extract data from the document and append to the result list
                doc_dict = doc.to_dict()
                # print(doc_dict)
                name = doc_dict['Name']
                if name == id:
                    result_list.append(doc_dict['vidUrl'])
                

            if result_list:
                return jsonify(result_list), 200
            else:
                return jsonify({'message': 'Video not found'}), 404

        except Exception as e:
            return jsonify({'error': str(e)}), 500