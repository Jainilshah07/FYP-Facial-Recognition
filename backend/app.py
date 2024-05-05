from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
import attendanceModel,getAttendance,employeeDetails,videoDetails,faceEncoding,testRoute

# Initialize Flask App
app = Flask(__name__)

# Test route
@app.route('/test', methods=['GET','POST','PUT'])
def test():
    return testRoute.test()

# Endpoint to get all elements in the attendance collection
@app.route('/get_attendance', methods=['GET','POST','PUT'])
def attendance():
    return getAttendance.get_attendance()

@app.route('/get_specific_attendance/<id>', methods=['GET'])
def specific_attendance(id):
    return getAttendance.get_specific_attendance(id)

@app.route('/get_attendance/<id>', methods=['DELETE'])
def del_attendance(id):
    return getAttendance.attendance_delete(id)

@app.route('/download_attendance', methods=['GET'])
def down_attendance():
    return getAttendance.download_attendance()

@app.route('/get_employee_details',methods=['GET','PUT'])
def employee():
    return employeeDetails.get_employee_details()

@app.route('/get_specific_employee/<id>', methods=['GET'])
def specific_employee(id):
    return employeeDetails.get_specific_employee(id)

@app.route('/get_employee_details/<id>',methods=['DELETE'])
def del_employee(id):
    return employeeDetails.employee_delete(id)  

@app.route('/download_employee_details', methods=['GET'])
def download_employee_details():
    return employeeDetails.download_employee_details()

@app.route('/get_video/<id>', methods=['GET'])
def specific_video(id):
    return videoDetails.get_video(id)

@app.route('/process_vid/<video_id>',methods=['GET'])
def attendance_run(video_id):
    return attendanceModel.attendance_model(video_id)

@app.route('/encode/<path>',methods=['POST','GET'])
def enocde_face(path):
    return faceEncoding.findEncodings(path)

if __name__ == '__main__':
    app.run(debug=True)