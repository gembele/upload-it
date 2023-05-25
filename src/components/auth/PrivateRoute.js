import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Alert } from 'react-bootstrap';

export default function PrivateRoute({ children }) {

    const {currentUser} = useAuth();

    if(!currentUser) {
        return <Navigate to='/login'/>
    }

    if(!currentUser.email) {
        return (
        <Navigate to='/home'/>
        )
        
    }

    return children;
}
