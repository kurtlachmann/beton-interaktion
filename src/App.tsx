import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RechteckQS from './rechteck_qs/RechteckQS';
import Stats from './stats/Stats';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<RechteckQS />} />
        <Route path='/stats' element={<Stats />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
