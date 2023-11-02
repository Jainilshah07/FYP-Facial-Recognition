import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Home from "./pages/home/Home";


function App() {
  return (
    <div>
        <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/" element={<Home />} ></Route>
        </Routes>
        </div>
      </div>
  );
}

export default App;