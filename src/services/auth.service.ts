import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FIREBASE_CONFIG from "../firebaseConfig";

const LOCAL_STORAGE_KEY = "x-access-token";

firebase.initializeApp(FIREBASE_CONFIG);

/*  TODO: implement refresh token flow. We need to add some implementation 
    in the apiClient and probably some functions here */

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return user;
}

export function getAuthToken(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}

export function isSignedIn(): boolean {
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

export async function signOut() {
  await firebase.auth().signOut();
}
