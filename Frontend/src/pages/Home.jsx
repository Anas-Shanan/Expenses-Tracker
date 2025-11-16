import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/login";
import Register from "../components/Register";

function Home() {
  const [view, setView] = useState("login");

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          className="d-flex justify-between align-center"
          style={{ gap: 20 }}
        >
          <div>
            <h1>Welcome</h1>
            <p className="text-muted">
              Track your expenses quickly and securely.
            </p>
          </div>
          <div>
            <div className="d-flex" style={{ gap: 8 }}>
              <button
                className={`btn ${
                  view === "login" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setView("login")}
                aria-pressed={view === "login"}
              >
                Login
              </button>
              <button
                className={`btn ${
                  view === "register" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setView("register")}
                aria-pressed={view === "register"}
              >
                Register
              </button>
            </div>
            <div style={{ marginTop: 10 }}>
              <Link to="/" className="link-button">
                Home
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          {view === "login" ? (
            <Login setView={setView} />
          ) : (
            <Register setView={setView} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
