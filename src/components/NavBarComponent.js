import React, {useState, useRef} from 'react'
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export default function NavBarComponent() {

    const [error, setError] = useState('');
    const searchRef = useRef();
    const { currentUser, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function openModal1() {
        setOpen(true);
    }

    function closeModal1() {
        setOpen(false);
    }

  async function handleLogout() {
    setError("");
  
    try {
      await logout();
      navigate("/login");
    } catch {
      setError('Failed to log out');
    }
  }

  async function handleSubmit1(e) {
    e.preventDefault()
    setError('');
    try {
      setOpen(false);
    }catch {
      setError('Post adding failed');
    }
  }

  function goToProfile() {
    navigate("/");
  }

  return (
    <Navbar bg="dark" expand="m" style={{display:'flex', justifyContent:'end'}}>
        <Navbar.Brand as={Link} to="/home" style={{marginRight:'auto', color:'white', fontWeight:'bold', marginLeft:'10px'}} >
            Upload-It
        </Navbar.Brand>
        <Nav.Link as={Button} onClick={openModal1} style={{color:'white', height: '40px', marginInline:'5px', paddingInline:'5px'}} >Search</Nav.Link>
        <Nav.Link as={Button} onClick={goToProfile} style={{color:'white', height: '40px', marginInline:'5px', paddingInline:'5px'}}>Profile</Nav.Link>
        <Nav.Link as={Button} onClick={handleLogout} style={{color:'white', height: '40px', marginInline:'5px', paddingInline:'5px'}}>Log Out</Nav.Link>
        <Modal show={open} onHide={closeModal1} size='lg'>
            <Modal.Body style={{width:'900px', backgroundColor:'black'}} >
            <Form onSubmit={handleSubmit1}>
                <Form.Group id='email'>
                <Form.Label style={{color:'white'}}>Search</Form.Label>
                <Form.Control style={{border:"3px solid blue", borderRadius:"10px"}} size="sm" type='search' ref={searchRef} required/>
                </Form.Group>
                <Button onClick={closeModal1} style={{margin:'10px', backgroundColor:'blue'}}>Close</Button>
                <Button style={{backgroundColor: "blue", margin:'10px'}} type='submit'>Confirm</Button>

            </Form>
            </Modal.Body>
        </Modal>
    
    </Navbar>
  )
}
