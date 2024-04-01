import React from "react";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import db from "../firebase";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();
const loginWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.href = "/";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

const loginWithGithub = () => {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      // This gives you a GitHub Access Token.

      console.log("Login successful", result);

      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.

      const user = result.user;
      window.location.href = "/";
    })
    .catch((error) => {
      console.log("Login failed", error);

      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
    });
};
const loginWithEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const signupWithEmail = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const Login = () => {
  return (
    <div className="login_main">
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          loginWithEmail(e.target.email.value, e.target.password.value);
        }}
      >
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login with Email</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupWithEmail(e.target.email.value, e.target.password.value);
        }}
      >
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up with Email</button>
      </form> */}

      <h1>Login</h1>
      <div className="buttons">
        <button onClick={loginWithGoogle}>
          <i className="bi bi-google"></i> Sign in with Google
        </button>
        <button onClick={loginWithGithub}>
          <i className="bi bi-github"></i> Sign in with Github
        </button>
      </div>
    </div>
  );
};

export default Login;
