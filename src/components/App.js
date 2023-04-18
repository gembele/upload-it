import React from "react";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Container
      style={{
        backgroundColor: "#2f303a",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        maxWidth: "100%",
      }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: "700px",
          backgroundColor: "#1e1414",
          color: "white",
          boxShadow: "4px 4px black",
          borderRadius: "10px",
          alignSelf: "center",
          paddingInline: "150px",
          width: "100vh",
        }}
      >
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
