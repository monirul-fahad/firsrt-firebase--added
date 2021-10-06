import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthenticatin from "./Firebase/firebase.initialize";

initializeAuthenticatin();
const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, uid, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          img: photoURL,
          id: uid,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGithunSignIn = () => {
    signInWithPopup(auth, GithubProvider).then((result) => {
      const { displayName, email, uid, photoURL } = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        img: photoURL,
        id: uid,
      };
      setUser(loggedInUser);
    });
  };
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };
  return (
    <div className="App">
      {!user.name ? (
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithunSignIn}>Github Sign In</button>
          <br />
        </div>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}

      <br />
      <br />
      {user.name && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.img} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
