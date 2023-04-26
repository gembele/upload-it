import React from "react";
import SignUp from "./auth/SignUp";
import Profile from "./Profile";
import LogIn from "./auth/LogIn";
import Home from "./Home";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import CenteredContainer from "./auth/CenteredContainer";

function App() {
  return (
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute><Profile /></PrivateRoute>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </AuthProvider>
        </Router>
  );
}

export default App;
