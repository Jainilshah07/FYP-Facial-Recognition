import cv2
import numpy as np
import face_recognition
import os
from flask import Flask, request, jsonify
from firebase_admin import storage, credentials, firestore, initialize_app
import csv
import pandas as pd


def attendance_model(video_id):
    if request.method == 'GET':
        try:
        # Initialize Flask App
            app = Flask(__name__)

            # Initialize Firestore DB
            # cred = credentials.Certificate('key.json')
            # initialize_app(cred)
            bucket = storage.bucket('gs://fyp-79526.appspot.com')
            blob = bucket.get_blob('Imgs.mp4')
            video_data = blob.download_as_string()
            return jsonify({'status': 'success', 'data': blob})
            # Convert the video data to a numpy array
        #     video = np.frombuffer(video_data, np.uint8)

        #     # Decode the video data using OpenCV
        #     video = cv2.imdecode(video, cv2.IMREAD_COLOR)
            
        #     path = 'internFaceData'
        #     images = []
        #     classNames = []
        #     myList = os.listdir(path)
        #     print(myList)
        #     for cl in  myList:
        #         curImg = cv2.imread(f'{path}/{cl}')
        #         images.append(curImg)
        #         classNames.append(os.path.splitext(cl)[0])

        #     def findEncodings(images):
        #         encodeList =  []
        #         for img in images:
        #             img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        #             encode = face_recognition.face_encodings(img)[0]
        #             encodeList.append(encode)
        #         return encodeList

        #     encodeListKnown = findEncodings(images)
        #     print('Encoding Done')

        #     cap = cv2.VideoCapture(video)

        #     while True:
        #         success, img = cap.read()
        #         imgS = cv2.resize(img,(0,0),None,0.25,0.25)
        #         imgS = cv2.cvtColor(imgS,cv2.COLOR_BGR2RGB)
                
        #         facesCurrFrame = face_recognition.face_locations(imgS)
        #         encodeCurrFrame = face_recognition.face_encodings(imgS,facesCurrFrame)

        #         for encodeFace,faceLoc in zip(encodeCurrFrame,facesCurrFrame):
        #             matches = face_recognition.compare_faces(encodeListKnown,encodeFace)
        #             faceDis = face_recognition.face_distance(encodeListKnown,encodeFace)
                    
        #             #check if the face is recognized        
        #             matchIndex = np.argmin(faceDis)

        #             if faceDis[matchIndex]<0.50: 
        #                 name = classNames[matchIndex].upper()
        #                 print(name)
        #             else:
        #                 name = "Unknown"
        #             y1,x2,y2,x1 = faceLoc
        #             y1,x2,y2,x1 =  y1*4,x2*4,y2*4,x1*4
        #             cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
        #             cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
        #             cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
                        
                
        #         cv2.imshow('Webcam',img)
        #         cv2.waitKey(1) 
        #         return jsonify({'success': True}), 200
                
                
        except Exception as e:
            return jsonify({'error': str(e)}), 500
                
                
                
        # # faceLoc = face_recognition.face_locations(imgMe)[0]
        # # encodeMe = face_recognition.face_encodings(imgMe)[0]
        # # cv2.rectangle(imgMe,(faceLoc[3],faceLoc[0]),(faceLoc[1],faceLoc[2]),(255,0,255),2)

        # # faceLocTest = face_recognition.face_locations(imgTest)[0]
        # # encodeTest = face_recognition.face_encodings(imgTest)[0]
        # # cv2.rectangle(imgTest,(faceLocTest[3],faceLocTest[0]),(faceLocTest[1],faceLocTest[2]),(255,0,255),2)

        # # results = face_recognition.compare_faces([encodeMe],encodeTest)
