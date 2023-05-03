import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { AddClient } from "./pages/addClient";
import { Auth } from "./pages/auth";
import { InitiateProject } from "./pages/initiateProject";
import { CreateUser } from "./pages/createUser";
import { Saved } from "./pages/saved";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/initiate-project" element={<InitiateProject />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
