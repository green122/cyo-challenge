import "./App.css";
import { signInWithEmailAndPassword } from "./services/auth.service";
import { AuthProvider } from "./core/ServiceProvider";
import React from "react";
import { Login } from "./components/Login/Login";

function App() {
  signInWithEmailAndPassword(
    "coding-challenge@construyo.de",
    "coding-challenge@construyo.de"
  );
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;
