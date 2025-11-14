import { Link } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import UpdateProfile from "../components/UpdateProfile";

function UserProfile() {
  return (
    <div>
      <h1>User Profile</h1>
      <Link to="/">Home</Link>
      <UpdateProfile />
      <ExpenseList />
    </div>
  );
}

export default UserProfile;
