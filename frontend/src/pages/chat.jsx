import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import Individual from '../components/individual'
import axios from 'axios';
import { Contextapi } from '../../context/contextapi';
import  {io}  from 'socket.io-client';
const socket = io('http://localhost:4000',{autoConnect:false});

const chat = () => {
  const data = useContext(Contextapi)
  const { chatdataUsers } = useContext(Contextapi)
  const [userid,loginUserid] =  useState('')

 


useEffect(() => {
  
 
 const soc = socket.connect();

    soc.emit('userinfo',userid)
 
 
    soc.on('chatMessage', (msg) => {
        console.log(msg)
        chatdataUsers(msg);
      });


    

    
}, [userid]);


useEffect(()=>{

  axios.get('/api/success')
  .then((res)=>{
    
    loginUserid(res.data._id)
 
  })
  .then((error)=>{
    console.log(error)
  })

 },[])


return (
  <div className='home'>

    <div className='container'>
    <Sidebar socket={socket}/>
    <Individual socket={socket}/>      
    </div>
  </div>
  )
}

export default chat
