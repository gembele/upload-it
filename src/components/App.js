import React from "react";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Container style={{backgroundColor:"#2f303a", width:"100%", minHeight:"100vh", display:'flex', justifyContent:"center",maxWidth:"100%"}}>
        <div className="w-100" style={{maxWidth:"700px", backgroundColor:"#1e1414", color:'white',boxShadow:"4px 4px black", borderRadius: "10px", alignSelf:'center', paddingInline: "150px", width:"100vh"}}>
        <SignUp/>
        </div>
        
      </Container>
    </AuthProvider>
  );
}

export default App;
