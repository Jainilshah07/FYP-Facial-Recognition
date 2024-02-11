import React, { useEffect, useState } from "react";
import axios from "axios";


const EmployeeAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const getAttendanceData = async () => {
      try {
        const response = await axios.get('/get_attendance');
        setAttendanceData(Object.values(response.data));
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    getAttendanceData();
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex my-4 justify-content-center">
        <h3>Attendance Data</h3>
      </div>
      <table className="min-w-full bg-white border table-fixed border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Employee ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Time In</th>
            <th className="border border-gray-300 px-4 py-2">Time Out</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((employee, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border border-gray-300 px-4 py-2">{Object.keys(employee)[0]}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.Name}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.Department}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.Email}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.TimeIn}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.TimeOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAttendance;