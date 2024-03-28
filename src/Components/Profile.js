import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const user = useAuth();

  return (
    <div className="profile_main">
      {user ? (
        <div className="profile_card">
          <div className="image">
            <img src={user.photoURL} alt="profile"></img>
          </div>
          <div className="content">
            <h2 className="username">{user.displayName}</h2>
            <h3 className="email">{user.email}</h3>
          </div>
          <Link to={"/my_polls"}>
            <button>My Polls</button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
