from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
import getAttendance,employeeDetails

# Initialize Flask App
app = Flask(__name__)

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



if __name__ == '__main__':
    app.run(debug=True)