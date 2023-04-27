import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';
import { database } from '../../firebase';

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('Passwords are not the same');
            return;
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);

            database.users.add({
              username: '',
              points: 0,
              email: emailRef.current.value
            })

            navigate("/login");
        } catch (err) {
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    return (
        <CenteredContainer>
        <Card style={{backgroundColor:"#1e1414", border:"10px solid #1e1414"}}>
          <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
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
  
              <Form.Group id='password-confirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control style={{border:"3px solid blue", borderRadius:"10px"}} size="sm" type='password' ref={passwordConfirmRef} required/>
              </Form.Group>
  
              <Button disabled={loading} className="mt-4" style={{backgroundColor: "blue", width:"100%"}}type='submit'>Submit</Button>
  
            </Form>
              <div className="text-center mb-4 mt-3">
                  <Link to="/LogIn">Log in</Link> if you have an account already 
              </div>
          </Card.Body>
        </Card>
        
      </CenteredContainer>
    );
}

export default SignUp;
