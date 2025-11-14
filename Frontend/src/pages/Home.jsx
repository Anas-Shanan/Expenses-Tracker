import { useState } from "react";
import Login from "../components/login";
import Register from "../components/Register";

function Home() {
  const [view, setView] = useState("login");

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Home</h1>
      <p>Select an option:</p>
      <button
        type="button"
        onClick={() => setView("login")}
        disabled={view === "login"}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => setView("register")}
        disabled={view === "register"}
      >
        Register
      </button>
      <div style={{ marginTop: "1rem" }}>
        {view === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Home;
