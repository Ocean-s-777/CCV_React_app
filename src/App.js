import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { UserAuthContext } from "./Context";
import Header from "./components/Header";
import PageSelect from "./components/PageSelect";
import Signup from "./components/pages/Signup";
import UserView from "./components/pages/UserView";
import LoginView from "./components/pages/Login";
import Sources from "./components/pages/Sources";
import CO2 from "./components/pages/CO2";
import Welcome from "./components/pages/Welcome";
import CustomCreation from "./components/pages/CustomCreation";
import Interceptor from "./components/pages/Interceptor";
import { fetchURL } from "./components/visualizations/modules/fetchURL";
import axios from "axios";

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  Legend,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
ChartJS.register(
  TimeScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  Legend,
  Title,
  Tooltip,
  Filler
);


function App() {
  const jwtFromStorage = window.localStorage.getItem("appAuthData");
  const initialAuthData = {
    username: null,
    jwt: jwtFromStorage,
    login: (newValueForJwt) => {
      const newAuthData = { ...userAuthData, jwt: newValueForJwt };
      window.localStorage.setItem("appAuthData", newValueForJwt);
      setIsLoggedIn(true);
      setUserAuthData(newAuthData);
    },
    logout: () => {
      window.localStorage.removeItem("appAuthData");
      setUserAuthData({ ...initialAuthData, jwt: null, username: null });
      setIsLoggedIn(false);
    }
  };

  const [userAuthData, setUserAuthData] = useState({ ...initialAuthData });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userAuthData.jwt != null || userAuthData.jwt != undefined) {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuthData.jwt}`,
        },
      };
      let data = null;
      axios.post(`${fetchURL}/user/verify`, data, config)
        .then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
            userAuthData.username = " " + res.data.username;
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            console.log("User is not logged in");
            setIsLoggedIn(false);
            userAuthData.logout();
          }
        });
    }
  }, []);

  function AuthRoutes() {
    if (isLoggedIn) {
      return (
        <>
          <Route path="/login" element={<Navigate to="/user" replace={true} />} />
          <Route path="/signup" element={<Navigate to="/user" replace={true} />} />
          <Route path="/user" element={<UserView />} />;
          <Route path="/create" element={<CustomCreation />} />
        </>
      );
    } else {
      return (
        <>
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Navigate to="/login" replace={true} />} />
          <Route path="/create" element={<Navigate to="/login" replace={true} />} />
        </>
      );
    }
  }

  return (
    <>
      <BrowserRouter>
        <UserAuthContext.Provider value={userAuthData}>
          <Header />
          <PageSelect />
          <Routes>
            <Route path="/" element={<Welcome />} />
            {AuthRoutes()}
            <Route path="/sources" element={<Sources />} />
            <Route path="/CO2" element={<CO2 />} />
            <Route path="/custom/*" element={<Interceptor />} />
          </Routes>
          <div className="container"></div>
        </UserAuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;