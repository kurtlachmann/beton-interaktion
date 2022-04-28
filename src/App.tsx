import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Home from './home/Home';
import RechteckQS from './rechteck_qs/RechteckQS';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rechteck_qs' element={<RechteckQS/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
