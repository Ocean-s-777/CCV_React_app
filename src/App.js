import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, /* Link */ } from "react-router-dom";
import { useState, /* useEffect */ } from "react";

import { UserAuthContext } from "./Context";
import Header from "./components/Header";
import PageSelect from "./components/PageSelect";
import Home from "./components/pages/Welcome";
import Signup from "./components/pages/Signup";
import UserView from "./components/pages/UserView";
import LoginView from "./components/pages/Login";
import Sources from "./components/pages/Sources";
import CO2 from "./components/pages/CO2";
import Welcome from "./components/pages/Welcome";
import Custom from "./components/pages/Custom";
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

const jwtFromStorage = window.localStorage.getItem("appAuthData");

function App() {
  const initialAuthData = {
    jwt: jwtFromStorage,
    login: (newValueForJwt) => {
      const newAuthData = { ...userAuthData, jwt: newValueForJwt };
      window.localStorage.setItem("appAuthData", newValueForJwt);
      setIsLoggedIn(true);
      setUserAuthData(newAuthData);
    },
    logout: () => {
      window.localStorage.removeItem("appAuthData");
      setUserAuthData({ ...initialAuthData });
      setIsLoggedIn(false);
    },
  };

  const [userAuthData, setUserAuthData] = useState({ ...initialAuthData });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userAuthData.jwt != null || userAuthData.jwt != undefined) {
      const config = {
        headers: {
          Authorization: `Bearer ${userAuthData.jwt}`,
        }
      }
      console.log(userAuthData.jwt);
      let data = null
      axios.post(`${fetchURL}/user/verify`, data, config)
        .then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
            console.log("User is logged in");
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

  let authRoutes = (
    <>
      <Route path="/login" element={<LoginView />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<CustomCreation />} />
    </>
  );

  if (userAuthData.jwt) {
    authRoutes = <Route path="/protected" element={<Welcome />} />;
    authRoutes = <Route path="/user" element={<UserView />} />;
  }

  return (
    <>
      <BrowserRouter>
        <UserAuthContext.Provider value={userAuthData}>
          <Header />
          <PageSelect />
          <UserAuthContext.Consumer>
            {(value) => (
              <div>
                Auth status: {isLoggedIn ? "Logged in" : "Not logged in"}
              </div>
            )}
          </UserAuthContext.Consumer>


          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/" element={<Welcome />} /> */}
            {authRoutes}
            {/* <Route path="*" element={<Home />} /> */}
            <Route path="/sources" element={<Sources />} />
            <Route path="/CO2" element={<CO2 />} />
            {/* <Route path="/custom" element={<Custom />} /> */}
            <Route path="/custom/*" element={<Interceptor />} />
          </Routes>
          <div className="container"></div>
        </UserAuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
