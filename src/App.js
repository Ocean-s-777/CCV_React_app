import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navigationbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import VisualizationV1 from './components/visualizations/VisualizationV1'

function App() {
  return (
    <>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/Login" element = {<Login />} />
        <Route path="/Signup" element = {<Signup />} />
      </Routes>
    </div>

    <VisualizationV1 />
    <VisualizationV1 />
    
  </>
  );
}

export default App;
