import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FIREBASE_CONFIG from "../firebaseConfig";

const LOCAL_STORAGE_KEY = "x-access-token";

firebase.initializeApp(FIREBASE_CONFIG);

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return user;
}

export function getAuthToken() {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}

export function isSignedIn() {
  return Boolean(getAuthToken());
}

export function subscribeToAuthChange(cb: (isSigned: boolean) => void) {
  const listener = firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      cb(false);
      return;
    }

    const token = await user.getIdToken();
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
    cb(true);
  });
  return listener;
}

export function unsubscribeToAuthChange(listener: firebase.Unsubscribe) {
  listener();
}
