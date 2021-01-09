import "./App.css";
import { AuthProvider } from "./core/ServiceProvider";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./core/Routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
