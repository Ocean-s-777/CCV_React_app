import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserAuthContext } from './Contexts';

import Header from './components/Header';
import PageSelect from './components/PageSelect';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import LoginView from './components/pages/Login';
import Sources from './components/pages/Sources';
import CO2 from './components/pages/CO2';


const jwtFromStorage = window.localStorage.getItem('appAuthData');

function App() {
  return (
    <>
    {/* <UserAuthContext.Provider value={ userAuthData }>
      <h1>React Router auth demo</h1>
      <UserAuthContext.Consumer>
        { value => (<div>Auth status: { value.jwt != null ? "Logged in": "Not logged in" }</div>) }
      </UserAuthContext.Consumer>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {
            authRoutes
          }
          <Route path="*" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </UserAuthContext.Provider> */}
    <Header />
    <PageSelect />
    <hr/>
    <div className='container'>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/login" element = {<LoginView />} />
        <Route path="/signup" element = {<Signup />} />
        <Route path="/sources" element = {<Sources />} />
        <Route path="/CO2" element = {<CO2 />} />
      </Routes>
    </div>
  </>
  );
}


function AuthApp() {

  const initialAuthData = {
    jwt: jwtFromStorage,
    login: (newValueForJwt) => {
      const newAuthData = { ...userAuthData,
          jwt: newValueForJwt
        };
      window.localStorage.setItem('appAuthData', newValueForJwt);
      setUserAuthData(newAuthData);
    },
    logout: () => {
      window.localStorage.removeItem('appAuthData');
      setUserAuthData({...initialAuthData});
    }
  };

  const [ userAuthData, setUserAuthData ] = useState({...initialAuthData});

  let authRoutes = <>
            <Route path="/login" element={ <LoginView /> } />
            <Route path="/signup" element={ <SignupView /> } />
          </>

  if(userAuthData.jwt) {
    authRoutes = <Route path="/protected" element={ <ProtectedView /> }/>
  }

  return (
    <UserAuthContext.Provider value={ userAuthData }>
      <h1>React Router auth demo</h1>
      <UserAuthContext.Consumer>
        { value => (<div>Auth status: { value.jwt != null ? "Logged in": "Not logged in" }</div>) }
      </UserAuthContext.Consumer>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {
            authRoutes
          }
          <Route path="*" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </UserAuthContext.Provider>
  );
}

export default App;
