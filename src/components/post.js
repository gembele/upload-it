import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { database } from '../firebase';

export default function Post({ id, title, user, points, url}) {

  const [postPoints, setPostPoints] = useState(points);

  function handleUpvote() {
    const postRef = database.posts.doc(id);
    postRef.update({
      points: postPoints + 1
    }, { merge: true }).then(() => {
      setPostPoints(postPoints + 1);
    }).catch((error) => {
      console.log("Error updating document: ", error);
    });
  }

  return (
    <div style={{ width: '100%', borderTop: '2px solid white' }}>
      <h3>{title}</h3>
      <p>User: {user}</p>
      <div style={{width:'100%', height:'80%'}}>
        <img src={url} width={'100%'}/>
      </div>
      <p>Points: {points}</p>
      <Button onClick={handleUpvote} style={{backgroundColor:'black', marginBottom:'20px'}}>Upvote</Button>
    </div>
  );
}
