import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function Post({ id, title, user, points, url}) {

  const [postPoints, setPostPoints] = useState(points);
  const { currentUser } = useAuth();
  const [voters, setVoters] = useState([]);
  const [error, setError] = useState('');
  const [admin, setAdmin] = useState(false);
  const [owner, setOwner] = useState(false);
  const [deleter, setDeleter] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const postRef = database.posts.doc(id);

  const checkUser = () => {
    if(currentUser.uid === 'Lb0XpWx8q5dAJ2RNq9dbSKIodPC2'){
      setAdmin(true);
    }
    if(admin || owner){
      setDeleter(true);
    }
  }

  useEffect(() => {
    setCurrentPage(window.location.pathname);
    console.log(currentPage);
    checkUser();
    postRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data.voters) {
          setVoters(data.voters);
        }
        if (data.user === currentUser.uid){
          setOwner(true);
        }
      } 
    }).catch((error) => {
      setError("Error getting document:", error);
    });
  }, []);

  function handleDelete() {
    postRef
      .delete()
      .then(() => {
        // Usunięcie posta z powodzeniem
        console.log("Post deleted successfully");
      })
      .catch((error) => {
        // Obsługa błędów podczas usuwania posta
        console.error("Error deleting post: ", error);
      });
  }

  function checkPage(currentPage) {
    if(admin){
      return <Button onClick={handleDelete} style={{backgroundColor:'black', marginBottom:'20px'}}>Delete</Button>
    }
    else {
      if(currentPage === '/' && owner) {
        return <Button onClick={handleDelete} style={{backgroundColor:'black', marginBottom:'20px'}}>Delete</Button>
      }
      else if(currentPage === '/home' && owner) {
        return <Button onClick={handleDelete} style={{backgroundColor:'black', marginBottom:'20px'}}>Delete</Button>
      }
    }
  }
  

  function handleUpvote() {
    const user = currentUser;
    
    if (voters.includes(user.uid)) {
      setError("Already voted!");
      return;
    }
    const updatedVoters = [...voters, user.uid];
    postRef.update({
      points: postPoints + 1,
      voters: updatedVoters
    }, { merge: true }).then(() => {
      setPostPoints(postPoints + 1);
      setVoters(updatedVoters);
    }).catch((error) => {
      console.log("Error updating document: ", error);
    });
  }
  return (
    <div style={{ width: '100%', borderTop: '2px solid white' }}>
      <h3>{title}</h3>
      <div style={{width:'100%', height:'80%'}}>
        <img src={url} width={'100%'}/>
      </div>
      <p>Points: {points}</p>
      {error && <Alert variant='danger'>{error}</Alert>}
        <div style={{display: 'flex', justifyContent:'space-between'}}>
        <Button onClick={handleUpvote} style={{backgroundColor:'black', marginBottom:'20px'}}>Upvote</Button>
        {checkPage(currentPage)}
      </div>
      
    </div>
  );
}
