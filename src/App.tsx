import "./App.css";
import { AuthProvider } from "./core/ServiceProvider";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./core/Routes";
import { Header } from "./components/Header/Header";
import { SceneContainer } from "./core/components/common";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <SceneContainer>
          <Routes />
        </SceneContainer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
