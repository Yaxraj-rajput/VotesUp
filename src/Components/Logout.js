import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        window.location.href = "/";
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return handleLogout();
};

export default Logout;
