import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import IndividualStat from "./components/IndividualStat";
import Register from "./pages/Register";

function App() {
  return (
    <div className="main-container">
      <Sidebar />

      <div className="display-right">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
