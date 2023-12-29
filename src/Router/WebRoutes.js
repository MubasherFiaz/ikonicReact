import React from "react";
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

import { useState, useEffect } from "react";
import Protected from "./Protected";
import LoginRedirect from "./LoginRedirect";
import Feedback from "../pages/Feedback";
import Login from "../auth/Login";
import Register from "../auth/Register";
import MainLayout from "../layout/MainLayout";
function WebRoutes(props) {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const navigate = useNavigate();
  const login_info = localStorage.getItem("login_token");
  function set_login_status() {
    if (login_info) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }

  useEffect(() => {
    set_login_status();
  }, []);
  const logIn = () => {
    navigate("/index");
  };
  const logOut = () => {
    setisLoggedIn(false);
    localStorage.removeItem("login_token");
    navigate("/");
  };
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Protected isLoggedIn={login_info}>
              <MainLayout>
                <Feedback />
              </MainLayout>
            </Protected>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <LoginRedirect isLoggedIn={login_info}>
              <Login />
            </LoginRedirect>
          }
        />
        <Route
          exact
          path="/feedback"
          element={
            <Protected isLoggedIn={login_info}>
              <MainLayout>
                <Feedback />
              </MainLayout>
            </Protected>
          }
        />
       
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
export default WebRoutes;
