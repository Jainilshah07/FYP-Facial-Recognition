import cv2
import numpy as np
import face_recognition
import os
from flask import Flask, request, jsonify, Response, send_file
from firebase_admin import storage, credentials, firestore, initialize_app
import csv
import pandas as pd
import pyrebase
import requests


def attendance_model(video_id):
    if request.method == 'GET':
        try:
        # Initialize Flask App
            app = Flask(__name__)
            # Download the video from the URL
            response = requests.get('https://firebasestorage.googleapis.com/v0/b/fyp-79526.appspot.com/o/videos%2FPart2.mp4?alt=media&token=ddbdd827-c134-4241-a834-8eee0fe818d2')

            # Save the file to a temporary file
            with open('temp-vid.mp4', 'wb') as f:
                f.write(response.content)
            
            path = 'internFaceData'
            images = []
            classNames = []
            myList = os.listdir(path)
            print(myList)
            for cl in  myList:
                curImg = cv2.imread(f'{path}/{cl}')
                images.append(curImg)
                classNames.append(os.path.splitext(cl)[0])

            def findEncodings(images):
                encodeList =  []
                for img in images:
                    img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
                    encode = face_recognition.face_encodings(img)[0]
                    encodeList.append(encode)
                return encodeList

            encodeListKnown = findEncodings(images)
            print('Encoding Done')

            cap = cv2.VideoCapture('temp-vid.mp4')
            
            # fourcc = cv2.VideoWriter_fourcc(*'XVID')
            # out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))

            while True:
                success, img = cap.read()
                imgS = cv2.resize(img,(0,0),None,0.25,0.25)
                imgS = cv2.cvtColor(imgS,cv2.COLOR_BGR2RGB)
                
                facesCurrFrame = face_recognition.face_locations(imgS)
                encodeCurrFrame = face_recognition.face_encodings(imgS,facesCurrFrame)

                for encodeFace,faceLoc in zip(encodeCurrFrame,facesCurrFrame):
                    matches = face_recognition.compare_faces(encodeListKnown,encodeFace)
                    faceDis = face_recognition.face_distance(encodeListKnown,encodeFace)
                    
                    #check if the face is recognized        
                    matchIndex = np.argmin(faceDis)

                    if faceDis[matchIndex]<0.50: 
                        name = classNames[matchIndex].upper()
                        print(name)
                    else:
                        name = "Unknown"
                    y1,x2,y2,x1 = faceLoc
                    y1,x2,y2,x1 =  y1*4,x2*4,y2*4,x1*4
                    cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
                    cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
                    cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
                
                
                _, buffer = cv2.imencode('.jpg',img)
                with open('processed-frames.mp4', 'wb') as f:
                    f.write(buffer.tobytes())
                return send_file('processed-frames.mp4', mimetype='video/mp4')
                # return Response(buffer.tobytes(), mimetype='video/mp4')
                # cv2.waitKey(1) 
                
                
                
        except Exception as e:
            return jsonify({'error': str(e)}), 500
                
                
                
        # # faceLoc = face_recognition.face_locations(imgMe)[0]
        # # encodeMe = face_recognition.face_encodings(imgMe)[0]
        # # cv2.rectangle(imgMe,(faceLoc[3],faceLoc[0]),(faceLoc[1],faceLoc[2]),(255,0,255),2)

        # # faceLocTest = face_recognition.face_locations(imgTest)[0]
        # # encodeTest = face_recognition.face_encodings(imgTest)[0]
        # # cv2.rectangle(imgTest,(faceLocTest[3],faceLocTest[0]),(faceLocTest[1],faceLocTest[2]),(255,0,255),2)

        # # results = face_recognition.compare_faces([encodeMe],encodeTest)
