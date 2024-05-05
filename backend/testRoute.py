import cv2
import numpy as np
import face_recognition
import os
from flask import Flask, request, jsonify, Response, send_file
from firebase_admin import storage, credentials, firestore, initialize_app
import pandas as pd
import requests
from datetime import datetime

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