import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import IndividualStat from "./components/IndividualStat";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access-token");
  return token ? children : <Navigate to={"/login"} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
