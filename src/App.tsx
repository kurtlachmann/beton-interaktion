import React from 'react';
import './App.css';
import Home from './home/Home';
import RechteckQS from './rechteck_qs/RechteckQS';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rechteck_qs' element={<RechteckQS/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
