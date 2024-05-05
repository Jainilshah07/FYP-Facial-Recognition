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
            images = []
            classNames = []
            myList = os.listdir(path)
            print(myList)
            
            for cl in myList:
                img = cv2.imread(f'{path}/{cl}')
                # images.append(curImg)
                classNames.append(os.path.splitext(cl)[0])
                img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
                encode = face_recognition.face_encodings(img)[0]
                print(encode)
                # encodeList.append(encode)
                data = {
                    'id': os.path.splitext(cl)[0],
                    'encodings': encode.tolist()
                }
                
                id = data['id']
                result.document(id).set(data)
            return jsonify({"success": True}), 200
        except Exception as e:
            return f"An Error Occured: {e}"
        
    # return encodeList



# def faceEncode(img):
#     img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
#     encode = face_recognition.face_encodings(img)[0]
#     print(encode)
#     encodeList.append(encode)
# return encodeList