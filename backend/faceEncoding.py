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

# path = 'internFaceData'


def findEncodings(path):  
    if request.method == "GET":
        try:
            data_list = []
            # Get all documents in the "attendance" collection
            documents = result.stream()

            # Create a dictionary to store the results
            result_dict = {}

            # Iterate through each document
            for doc in documents:
                # Extract data from the document
                data = doc.to_dict()
                # employee_id = doc.id  # Employee ID is the document ID

                # Add the data to the result dictionary
                # result_dict[employee_id] = data
                data_list.append(data)
                
            return jsonify(data_list), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
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
    # if request.method == 'POST':
    #     try:
    #         images = []
    #         classNames = []
    #         myList = os.listdir(path)
    #         print(myList)
            
    #         for cl in myList:
    #             img = cv2.imread(f'{path}/{cl}')
    #             # images.append(curImg)
    #             classNames.append(os.path.splitext(cl)[0])
    #             img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    #             encode = face_recognition.face_encodings(img)[0]
    #             print(encode)

    #             if len(encode) > 0:
    #                 encode = encode[0]
    #                 print(encode)
    #             # encodeList.append(encode)
    #             data = {
    #                 'id': os.path.splitext(cl)[0],
    #                 'encodings': encode.tolist()
    #             }
                
    #             id = data['id']
    #             result.document(id).set(data)
    #         return jsonify({"success": True}), 200
    #     except Exception as e:
    #         return f"An Error Occured: {e}"
        
    # return encodeList



# def faceEncode(img):
#     img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
#     encode = face_recognition.face_encodings(img)[0]
#     print(encode)
#     encodeList.append(encode)
# return encodeList
