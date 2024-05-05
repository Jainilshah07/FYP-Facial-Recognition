import cv2
import numpy as np
import face_recognition
import os
from flask import Flask, request, jsonify, Response, send_file
from firebase_admin import storage, credentials, firestore, initialize_app
import pandas as pd
import requests
from datetime import datetime
db = firestore.client()
result = db.collection('encodings')
def test():
    if request.method == 'GET':
        try:
            res = requests.get('http://127.0.0.1:5000/encode/abc')
            # print(res.json())
            ids, encodings = zip(*[(item['id'], item['encodings']) for item in res.json()])
            print(type(ids))
            # print(encodings)
            return jsonify({'message': 'success'}), 200
        except Exception as e:
            return jsonify({'message': 'error'}), 400
        
    if request.method == 'POST':
        try:
            # Get the image URL and user ID from the request
            imgUrl = request.json['imgUrl']
            id = request.json['id']

            # Download the image from the URL
            response = requests.get(imgUrl)
            image_data = response.content

            # Decode the image
            image = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)

            # Convert the image to RGB
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # Detect faces in the image
            face_locations = face_recognition.face_locations(image)

            # Encode the faces
            face_encodings = face_recognition.face_encodings(image, face_locations)

            if len(face_encodings) > 0:
                # Get the first encoded face
                encoded_face = face_encodings[0]

                # Store encoded face in Firebase
                data = {
                    'id': id,
                    'encodings': encoded_face.tolist()
                    # 'timestamp': firestore.SERVER_TIMESTAMP
                }
                id = data['id']
                result.document(id).set(data)

                return jsonify({"success": True}), 200
            else:
                return jsonify({"error": "No face detected"}), 400
        except Exception as e:
            return f"An Error Occured: {e}" 