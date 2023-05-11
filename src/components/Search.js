import React, {useState, useEffect, Text} from 'react'
import PrimaryContainer from './auth/PrimaryContainer'
import SecondaryContainer from './auth/SecondaryContainer'
import NavBarComponent from './NavBarComponent';
import { database } from '../firebase';
import { useLocation } from 'react-router-dom';
import Post from './post';


export default function Search() {

  const [posts, setPosts] = useState([]);
  const location = useLocation();
  console.log(location.state.SearchQuery);
  

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
        <h2 className='text-center mb-4' style={{color:'white'}}>Search</h2>
          {posts.filter((post) => post.title.toLowerCase().includes( location.state.SearchQuery.toLowerCase())).map((post) => (
              <Post key={post.id} id={post.id} title={post.title} user={post.user} points={post.points} url={post.url} />
          ))}
      </SecondaryContainer>
    </PrimaryContainer>
    </>
    
  )
}





