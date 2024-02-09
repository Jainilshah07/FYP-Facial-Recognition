from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
import getAttendance

# Initialize Flask App
app = Flask(__name__)

# Endpoint to get all elements in the attendance collection
@app.route('/get_attendance', methods=['GET','POST'])
def attendance():
    try:
        return getAttendance.get_attendance()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

   

if __name__ == '__main__':
    app.run(debug=True)