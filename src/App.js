import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Game from './components/Game';
import Index from "./components/Index";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/game/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
