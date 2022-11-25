import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import PageSelect from './components/PageSelect';
import Home from './components/pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Sources from './components/pages/Sources';
import CO2 from './components/pages/CO2';

function App() {
  return (
    <>
    <Header />
    <PageSelect />
    <hr/>
    <div className='container'>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/Login" element = {<Login />} />
        <Route path="/Signup" element = {<Signup />} />
        <Route path="/Sources" element = {<Sources />} />
        <Route path="/CO2" element = {<CO2 />} />
      </Routes>
    </div>
  </>
  );
}

export default App;
