import React, {useState, useEffect} from 'react';
import NavBarComponent from './NavBarComponent';
import PrimaryContainer from './auth/PrimaryContainer';
import SecondaryContainer from './auth/SecondaryContainer';
import Post from './post';
import { database } from '../firebase';




export default function Home() {

  const [posts, setPosts] = useState([]);
  


  useEffect(() => {
    const unsubscribe = database.posts.orderBy('points', 'desc').onSnapshot(snapshot => {
      const postsData = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        postsData.push({
          id: doc.id,
          title: data.title,
          user: data.user,
          points: data.points,
          url: data.url
        });
      });
      setPosts(postsData);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <NavBarComponent/>
      <PrimaryContainer>
        <SecondaryContainer>
          <h2 className='text-center mb-4' style={{color:'white'}}>Home</h2>
          {posts.map((post) => (
            <Post key={post.id} id={post.id} title={post.title} user={post.user} points={post.points} url={post.url} />
          ))}
        </SecondaryContainer>
      </PrimaryContainer>
        
    </>
  )
}
