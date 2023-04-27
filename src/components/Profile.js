import React, {useState, useRef} from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import PrimaryContainer from './auth/PrimaryContainer';
import SecondaryContainer from './auth/SecondaryContainer';
import NavBarComponent from './NavBarComponent';
import { database } from '../firebase';

export default function Profile() {


  const titleRef = useRef();
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
      setOpen(false);
      database.posts.add({
        title: titleRef.current.value,
        user: currentUser.uid,
        points: 0
      })

  }

  return (
    <>
    <NavBarComponent/>
    <PrimaryContainer>
      <div style={{display:'flex', width:'700px', height: '150px', flexDirection:'row', alignSelf:'center', marginBottom:'-100px', marginTop:'50px'}}>
        <div style={{ width:'350px', display:'flex', flexDirection:'row'}}>
          <div style={{width:'140px', height:'140px', border:'2px solid white', borderRadius:'100px', backgroundImage:'url(https://img.icons8.com/ios-filled/140/user.png)'}}>
            
          </div>
          <div style={{margin:'auto'}}>
            <strong style={{color:'white'}}>Email: {currentUser.email}</strong>
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
            </Form.Group>
            <Button style={{backgroundColor: "blue", margin:'10px'}} type='submit'>Confirm</Button>

            
          </Form>
        </Modal.Body>
      </Modal>
      
      <SecondaryContainer>
        <h2 className='text-center mb-4' style={{color:'white'}}>My posts</h2>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla scelerisque nulla fermentum sapien ullamcorper varius. Proin pellentesque tortor et libero luctus suscipit. Proin quis dictum arcu. Morbi felis purus, aliquam mollis consequat non, maximus sit amet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In leo tellus, interdum sit amet leo in, malesuada finibus leo. Nulla facilisi. Proin et orci lectus. Aenean sit amet urna in ex ultricies eleifend. Vivamus vel consectetur mi, at aliquet velit. Sed hendrerit quis neque eu sollicitudin. Ut nec risus vitae magna mattis viverra consequat nec justo. Donec imperdiet erat quis accumsan cursus. Nulla et turpis consectetur quam dignissim ultricies sed non nulla.

Morbi elementum eu purus ut eleifend. Cras quis metus eu lacus feugiat mollis in non eros. Nullam id sem vestibulum, convallis nisl sed, aliquam tellus. Integer tristique sed dui a tincidunt. Duis interdum leo ut enim congue porta. Sed non posuere velit. Pellentesque tellus ante, mollis at accumsan non, auctor vitae ipsum. Cras a tincidunt mauris. Maecenas consequat dolor augue, dignissim euismod nulla cursus ut. In ultrices lacus eget vehicula posuere. Aenean congue lobortis ante, ut facilisis mauris sodales eget. Curabitur venenatis dui non urna pretium, in suscipit risus ultrices. Cras in urna gravida, suscipit erat vel, condimentum nisi.

Aenean egestas, erat a ultricies semper, nisl arcu consequat nulla, id tempor neque felis eget eros. Cras vel porta justo, sit amet sagittis orci. Aliquam feugiat tempor ante, id vehicula purus pharetra at. Nulla in cursus nisl, sit amet convallis nunc. Maecenas mi nisi, laoreet ornare molestie a, maximus ac ante. Ut tincidunt interdum nisi ut fringilla. Mauris fringilla finibus tristique. In tristique accumsan leo at posuere. Nullam auctor at tortor vel rutrum.

Cras efficitur sollicitudin lacus in vulputate. Mauris maximus arcu vel rhoncus vestibulum. Sed augue urna, tincidunt quis est at, aliquam egestas risus. Nam semper sollicitudin nibh a hendrerit. Integer feugiat sit amet purus sed interdum. In hac habitasse platea dictumst. Donec aliquam ex ac viverra scelerisque. Integer viverra feugiat diam eget porttitor. Praesent dui risus, vehicula id mattis a, dignissim et magna. Curabitur hendrerit nisi sed molestie cursus. Suspendisse feugiat arcu vel quam dictum, ut ultricies turpis auctor. Nam vulputate tempus risus ut vestibulum.

Mauris feugiat, ligula sit amet accumsan ultrices, massa quam facilisis lorem, at ornare lectus magna at ipsum. Vivamus faucibus malesuada rutrum. Cras at nisl quis nibh aliquet pellentesque. Phasellus fermentum augue non ligula euismod, et eleifend purus pretium. Donec ut dui non dui condimentum commodo vel aliquam velit. Sed viverra ultricies fermentum. Vestibulum sollicitudin auctor ultrices. Praesent nec sagittis neque. Nulla sed faucibus dolor. Nulla accumsan, lacus eget ultricies vestibulum, turpis enim sollicitudin leo, at accumsan ex ex id augue. Pellentesque elementum malesuada augue ac lobortis. Morbi dapibus molestie odio, sed auctor velit fringilla consequat. Suspendisse id consectetur risus. Nulla aliquam viverra nibh, vestibulum bibendum ex laoreet vel.

Phasellus ut nisi nec lacus semper mollis. Integer a felis volutpat, luctus libero eget, egestas lectus. Aenean euismod dapibus ligula. Phasellus velit quam, gravida ac orci eget, ultricies venenatis urna. Praesent eu mollis ante, volutpat lobortis arcu. Nulla justo ipsum, accumsan at tortor sit amet, ultrices elementum ante. Nunc aliquet eleifend pharetra. Sed lacinia diam tortor, ut dictum elit fringilla quis. Praesent eget malesuada lorem, elementum viverra arcu. Ut tempus enim at sem aliquam, eu porttitor nisi aliquam.

Nullam sed ultrices quam, nec blandit augue. Etiam non placerat est, vitae maximus sapien. Nulla vestibulum tortor ac feugiat ultricies. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed molestie suscipit commodo. Praesent placerat nunc in mauris rhoncus, quis luctus sem luctus. Aliquam varius elit sed neque venenatis lobortis. Vivamus est lacus, rutrum in diam sed, porta gravida dolor. Sed interdum sem pretium facilisis ornare. Suspendisse potenti. Aenean tempus tellus vitae velit blandit congue.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce fermentum viverra orci. Fusce ac ligula neque. Curabitur ex justo, ornare eget ante sit amet, semper iaculis erat. Praesent tempus nulla eu libero condimentum suscipit. Duis molestie ornare nisi eget rutrum. Vivamus dignissim, dui sit amet vulputate blandit, neque turpis iaculis velit, ac scelerisque dui mauris ut purus. Donec convallis leo erat, sit amet mollis leo pulvinar ac. Suspendisse consequat massa sit amet neque dapibus vulputate. Fusce ac purus enim. Ut molestie pulvinar dolor et blandit. In vitae justo massa. Fusce consectetur ligula in ex ultricies, ullamcorper consequat justo condimentum.

Proin eleifend enim nec congue molestie. Nunc malesuada elit quis nunc eleifend eleifend. Aenean convallis vitae enim eu suscipit. Morbi elementum sit amet lorem id fermentum. Nullam tellus dui, volutpat pellentesque molestie a, aliquet laoreet sapien. Nulla sit amet nunc enim. Vestibulum elementum efficitur est, in laoreet ipsum vestibulum quis. Aenean consequat dui justo, sed fringilla massa consectetur et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ultricies tellus vitae neque fringilla venenatis. Etiam nunc dui, molestie ut ligula placerat, pretium tempus nibh. Donec finibus est quis odio eleifend placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas maximus ligula. Nam diam orci, tempus vel ullamcorper eget, varius bibendum libero.

Nam id sollicitudin est. Nulla ullamcorper placerat nisi, at venenatis ligula molestie id. Aliquam bibendum id nunc eu suscipit. Ut fermentum, dolor sit amet faucibus efficitur, quam magna dignissim justo, vel volutpat enim lectus quis quam. Curabitur varius commodo interdum. Donec non varius ipsum, eget fringilla ex. Quisque massa nunc, cursus vel magna eget, vulputate hendrerit massa. Curabitur non laoreet arcu.
        </p>
      </SecondaryContainer>
    </PrimaryContainer>
    </>
  )
}
