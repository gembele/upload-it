import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            // route
        } catch (err) {
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    return (
        <>
        <Card style={{backgroundColor:"#1e1414", border:"10px solid #1e1414"}}>
          <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {currentUser && currentUser.email}
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
                  Log in if you have an account already 
              </div>
          </Card.Body>
        </Card>
        
      </>
    );
}

export default SignUp;
