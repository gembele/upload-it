import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import PrimaryContainer from './auth/PrimaryContainer';
import SecondaryContainer from './auth/SecondaryContainer';
import NavBarComponent from './NavBarComponent';
import { database, storage } from '../firebase';
import Post from './post';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export default function Profile() {
  const [file, setFile] = useState();
  const [imgUrl, setImgUrl] = useState();
  const titleRef = useRef();
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }


  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    const storageRef = ref(storage, `files/${currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        setError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
            .catch((error) => {
              setError(error.message);
            });
        });
      }
    );
    database.posts
    .add({
      title: titleRef.current.value,
      user: currentUser.uid,
      points: 0,
      url: imgUrl,
    })
    setOpen(false);
  }

  useEffect(() => {
    const unsubscribe = database.posts.orderBy('points', 'desc').onSnapshot((snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        postsData.push({
          id: doc.id,
          title: data.title,
          user: data.user,
          points: data.points,
          url: data.url,
        });
      });
      setPosts(postsData);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const userRef = database.users.doc(currentUser.uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        setUser(doc.data());
      }
    });
  }, [currentUser]);

  return (
    <>
    <NavBarComponent/>
    <PrimaryContainer>
      <div style={{display:'flex', width:'700px', height: '150px', flexDirection:'row', alignSelf:'center', marginBottom:'-100px', marginTop:'50px'}}>
        <div style={{ width:'350px', display:'flex', flexDirection:'row'}}>
          <div style={{width:'140px', height:'140px', border:'2px solid white', borderRadius:'100px', backgroundImage:'url(https://img.icons8.com/ios-filled/140/user.png)'}}>
            
          </div>
          <div style={{margin:'auto'}}>
            <strong style={{color:'white'}}>Username: {currentUser.email}</strong>
            <p style={{color:'white'}}>Points: {currentUser.points}</p>
          </div>
        
        </div>
        <div style={{width:'350px', alignItems:'center', justifyContent:'center',display:'flex'}}>
          <Button onClick={openModal} size="lg" style={{borderRadius:'45px'}}>Add Post</Button>
        </div>
      </div>

      <Modal show={open} onHide={closeModal} size='lg'>
        <Modal.Body style={{width:'900px', backgroundColor:'black'}} >
          <Form onSubmit={handleSubmit}>
            <Form.Group id='title'>
              <Form.Label style={{color:'white'}}>Title</Form.Label>
              <Form.Control style={{border:"3px solid blue", borderRadius:"10px"}} size="sm" type='title' ref={titleRef} required/>
              <Form.Control type='file' onChange={handleChange} />
            </Form.Group>
            <Button style={{backgroundColor: "blue", margin:'10px'}} type='submit'>Confirm</Button>

            
          </Form>
        </Modal.Body>
      </Modal>

        <SecondaryContainer>
          <h2 className='text-center mb-4' style={{color:'white'}}>My posts</h2>
          {posts.filter((post) => post.user === currentUser.uid).map((post) => (
              <Post key={post.id} title={post.title} user={post.user} points={post.points} url={post.url} />
          ))}

        </SecondaryContainer>

    </PrimaryContainer>
    </>
  )
}
