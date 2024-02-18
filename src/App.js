import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./boards.css";
import Game from "./components/Game";
import Index from "./components/Index";
import NotFound from "./components/NotFound";
import How2Play from "./components/How2Play";
import GithubLinks from "./components/GithubLinks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/game/:game_id" element={<Game />} />
        <Route path="/howtoplay" element={<How2Play />} />
        <Route path="/links" element={<GithubLinks />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
