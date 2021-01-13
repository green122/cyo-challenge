import "./App.css";
import { AuthProvider } from "./core/AuthProvider";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./core/Routes";
import { Header } from "./components/Header/Header";
import { StyledContainer } from "./core/components/common";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <StyledContainer>
          <Routes />
        </StyledContainer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
