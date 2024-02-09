import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Home from "./pages/home/Home";
import EmployeeAttendance from "./pages/attendance/NotUsing";
import EmployeeDetails from "./pages/employee/EmployeeDetails";
import AddEmployee from "./pages/employee/AddEmployee";
import Add from "./pages/employee/Add";
import Employee from "./pages/employee/Employee";
import Attendance from "./pages/attendance/Attendance";


function App() {
  return (
    <div>
        <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/attendance" element={<Attendance />} ></Route>
          <Route path="/add-emp" element={<AddEmployee />} ></Route>
          <Route path="/add" element={<Add />} ></Route>
          <Route path="/employee-details" element={<Employee/>} ></Route>
        </Routes>
        </div>
      </div>
  );
}

export default App;