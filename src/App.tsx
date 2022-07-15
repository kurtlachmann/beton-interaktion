import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RechteckQS from './rechteck_qs/RechteckQS';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<RechteckQS />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
