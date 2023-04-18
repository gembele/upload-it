import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';

function LogIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, anonymousLogin } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (err) {
            setError('Failed to log in');
        }

        setLoading(false);
    }

    async function handleAnnymous() {
      try {
          await anonymousLogin();
          navigate("/");
      } catch (err) {
          setError('Failed to log in');
      }

  }

    return (
        <>
        <Card style={{backgroundColor:"#1e1414", border:"10px solid #1e1414"}}>
          <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
  
              
              
              <Form.Group id='email'>
                <Form.Label>E-mail</Form.Label>
                <Form.Control style={{border:"3px solid blue", borderRadius:"10px"}} size="sm" type='email' ref={emailRef} required/>
              </Form.Group>
  
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control style={{border:"3px solid blue", borderRadius:"10px"}} size="sm" type='password' ref={passwordRef} required/>
              </Form.Group>

              <Button disabled={loading} className="mt-4" style={{backgroundColor: "blue", width:"100%"}}type='submit'>Log In</Button>
  
            </Form>
              <div className="text-center mb-4 mt-3">
                  <Link to="../signup">Sign Up</Link> if you don't have an account already 
                  <Button style={{marginBottom: "-20px", marginTop:"20px"}} onClick={handleAnnymous} >Log in as anonymous</Button>
              </div>
              
          </Card.Body>
        </Card>
        
      </>
    );
}

export default LogIn;
