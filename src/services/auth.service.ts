import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FIREBASE_CONFIG from "../firebaseConfig";

const LOCAL_STORAGE_KEY = "x-access-token";

firebase.initializeApp(FIREBASE_CONFIG);
firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return;
  }

  const token = await user.getIdToken();
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
});

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}
