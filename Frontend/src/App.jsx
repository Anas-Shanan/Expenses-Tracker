import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
