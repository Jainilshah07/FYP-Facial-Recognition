import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Home from "./pages/home/Home";
import AddEmployee from "./pages/employee/AddEmployee";
import Employee from "./pages/employee/Employee";
import Attendance from "./pages/attendance/Attendance";
import EditEmployee from "./pages/employee/EditEmployee";
import AttenBased from "./pages/defaulters/AttenBased";
import VideoPage from "./pages/video/VideoPage";

function App() {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/dashboard" element={<Home />} ></Route>
          <Route path="/attendance" element={<Attendance />} ></Route>
          <Route path="/add-employee" element={<AddEmployee />} ></Route>
          <Route path="/employee-details" element={<Employee />} ></Route>
          <Route path="/employee-details/:id" element={<EditEmployee />} ></Route>
          <Route path="/defaulter" element={<AttenBased />} ></Route>
          <Route path="/videos" element={<VideoPage />} ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;