import React from 'react';
import { useState } from 'react'
import {BrowserRouter as Router,Route, Link, Routes} from "react-router-dom";
import './css/App.css'


import Login from "./view/Login";
import Dashboard from './view/admin/Dashboard';
import Artistas from './view/admin/Artistas'
import WebsiteManagement from './view/admin/WebsiteManagement';
import Murais from './view/admin/Murais';
import Eventos from './view/admin/Eventos';
import Comentarios from './view/admin/Comentarios';

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Website" element={<WebsiteManagement />} />
          <Route path="/Murais" element={<Murais />} />
          <Route path="/Artistas" element={<Artistas />} />
          <Route path="/Eventos" element={<Eventos />} />
          <Route path="/Comentarios" element={<Comentarios />} /> 
        </Routes>
      </Router>
    </div>
  )
}

export default App
