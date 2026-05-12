import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Applications from "./components/Applications/Applications";
import Dashboard from "./components/Dashboard/Dashboard";
import { useApp } from "./context/AppContext";
import Profile from "./components/Profile/Profile";


function App() {
  const {user, isLoading} = useApp()

  if (isLoading) return <div>Loading....</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applications/" element={<Applications />} />
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
