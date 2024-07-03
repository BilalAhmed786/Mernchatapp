import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import image from '../image/download.jpg';
import axios from 'axios'


const navbar = (props) => {
  
  const userLogout = async () => {

    const response = await axios.get('/api/logout')

    try {
      if (response.data.msg) {
         
        
          window.location.href = 'http://localhost:5173/login'
      } 
      else {

          window.location.href = 'http://localhost:5173/login'
        
      }

    } catch (error) {

      console.log(error)
    }



  }


  
  return (
    <div className='navbar'>
      <span className='logo'>Saif Chat</span>
      <div className='user'>
        <img src={image} alt="" />

        <span>{props.username}</span>
        <button onClick={userLogout}><FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /></button>
      </div>

    </div>
  )
}

export default navbar