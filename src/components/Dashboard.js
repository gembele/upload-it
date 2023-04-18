import React, {useState} from 'react'
import { Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();



 async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError('Failed to log out');
    }
 }

  return (
    <>
      <Card>
        <Card.Body>
        <h2 className='text-center mb-4' style={{color:'black'}}>Profile</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <strong style={{color:'black'}}>Email: {currentUser.email}</strong>
        </Card.Body>
      </Card>
      <div className="text-center mb-4 mt-3">
        <Button variant='link' onClick={handleLogout} className="mt-4" style={{backgroundColor: "blue", width:"100%"}}>Log Out</Button> 
      </div>
    </>
  )
}
