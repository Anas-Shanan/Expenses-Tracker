import { Link } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import UpdateProfile from "../components/UpdateProfile";

function UserProfile() {
  return (
    <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1 className="text-muted">User Profile</h1>
      <Link className="btn btn-secondary" to="/">
        Home
      </Link>
      <UpdateProfile />
      <ExpenseList />
    </div>
  );
}

export default UserProfile;
