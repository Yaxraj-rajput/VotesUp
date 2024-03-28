import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import VotePoll from "./Pages/VotePoll";
import "./Static/Styles/Style.css";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import NewPoll from "./Components/NewPoll";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
import { AuthProvider } from "./Context/AuthContext";
import MyPolls from "./Components/MyPolls";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className="wrapper">
          <HashRouter>
            {" "}
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/poll/:pollid" element={<VotePoll />} />
              <Route path="/new" element={<NewPoll />} />
              <Route path="/my_polls" element={<MyPolls />} />
            </Routes>
          </HashRouter>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
