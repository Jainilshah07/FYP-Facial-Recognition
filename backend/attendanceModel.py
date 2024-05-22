import cv2
import numpy as np
import face_recognition
import os
from flask import Flask, request, jsonify, Response, send_file
from firebase_admin import storage, credentials, firestore, initialize_app
import pandas as pd
import requests
from datetime import datetime

def check_consecutive_names(names):
    i = 0
    while i < len(names) - 1:
        if names[i] == names[i+1]:
            del names[i+1]
        else:
            i += 1
    return names

def attendance_model(video_id):
    if request.method == 'GET':
        try:
        # Initialize Flask App
            app = Flask(__name__)
            res = requests.get(f'http://127.0.0.1:5000/get_video/{video_id}')
            if res.status_code == 200:
                res = res.json()
            # Download the video from the URL
            response = requests.get(res[0])

            # Save the file to a temporary file
            with open('temp-vid.mp4', 'wb') as f:
                f.write(response.content)
            
            interval = 5
            classNames = []
            res = requests.get('http://127.0.0.1:5000/encode/abc')
            # print(res.json())
            ids, encodings = zip(*[(item['id'], item['encodings']) for item in res.json()])
            encodeListKnown = list(encodings)
            classNames = list(ids)
            
            print('Encoding Done')

            cap = cv2.VideoCapture('temp-vid.mp4')
            names = []

            while True:
                success, img = cap.read()
                if not success:
                    break
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
                        name = classNames[matchIndex]
                        names.append(name)
                        print(names)
                    else:
                        name = "Unknown"
                    # y1,x2,y2,x1 = faceLoc
                    # y1,x2,y2,x1 =  y1*4,x2*4,y2*4,x1*4
                    # cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
                    # cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
                    # cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
                names = check_consecutive_names(names)
                
                for i in range(interval):
                    cap.grab() 
                    
            '''Example for post request on postman
            #? Hit on http://127.0.0.1/get_attendance
            The raw json format:
            #* {"id": "EMP004",
            #* "Department": "IT",
            #* "Email": "jay@gmail.com",
            #* "Name": "JJ",
            #* "TimeIn": "Fri, 15 Dec 2023 06:33:23 GMT",
            #* "TimeOut": "Fri, 15 Dec 2023 18:30:00 GMT"}
            '''
            for i in range(0,len(names)):
                now = datetime.now()
                data = {
                        "id": f'{names[i]} {now.date()}',
                        "name": f'{names[i]}',
                        "date": f'{now.date()}',
                        "Time_In": now.strftime(r'%H:%M:%S'),
                        "In_attendance": True
                        }
                requests.post(f'http://127.0.0.1:5000/get_attendance',json=data) 
            return jsonify({"People":names})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
                
                
                
        # # faceLoc = face_recognition.face_locations(imgMe)[0]
        # # encodeMe = face_recognition.face_encodings(imgMe)[0]
        # # cv2.rectangle(imgMe,(faceLoc[3],faceLoc[0]),(faceLoc[1],faceLoc[2]),(255,0,255),2)

        # # faceLocTest = face_recognition.face_locations(imgTest)[0]
        # # encodeTest = face_recognition.face_encodings(imgTest)[0]
        # # cv2.rectangle(imgTest,(faceLocTest[3],faceLocTest[0]),(faceLocTest[1],faceLocTest[2]),(255,0,255),2)

        # # results = face_recognition.compare_faces([encodeMe],encodeTest)
