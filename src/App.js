import React  from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import SpectaclePage from "scenes/spectaclePage";
import ActorPage from 'scenes/actorPage';
import PersonagemPage from 'scenes/personagemPage';
import GamePage from 'scenes/gamePage';
import CadastroTurmaPage from 'scenes/cadastroTurmaPage';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/spectacle/"
              element={isAuth ? <SpectaclePage /> : <Navigate to="/" />}
            />
            <Route
              path="/ator/"
              element={isAuth ? <ActorPage /> : <Navigate to="/" />}
            />
            <Route
              path="/personagem"
              element={isAuth ? <PersonagemPage /> : <Navigate to="/" />}
            />
            <Route
              path="/games"
              element={isAuth ? <GamePage /> : <Navigate to="/" />}
            />
            <Route
              path="/cadastro/turma"
              element={isAuth ? <CadastroTurmaPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
