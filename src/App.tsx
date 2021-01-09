import "./App.css";
import { signInWithEmailAndPassword } from "./services/auth.service";
import { AuthProvider } from "./core/ServiceProvider";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./core/Routes";

function App() {
  signInWithEmailAndPassword(
    "coding-challenge@construyo.de",
    "coding-challenge@construyo.de"
  );
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
