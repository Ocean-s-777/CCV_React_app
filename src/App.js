import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';


import Navbar from './components/Navigationbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

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
  </>
  );
}

export default App;
