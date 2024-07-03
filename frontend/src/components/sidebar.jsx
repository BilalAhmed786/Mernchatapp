import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './navbar'
import Contacts from './users'
import { Contextapi } from '../../context/contextapi';


const sidebar = ({socket}) => {
 
  const navigate = useNavigate()
  const [username, stateUser] = useState('');
  const {LoginID} = useContext(Contextapi)

  
  useEffect(() => {

    const userget = async () => {

      const response = await axios.get('/api/success')
     
      try {

        if (response.data.username) {

          stateUser(response.data)
          LoginID(response.data._id)
          
        } else {

          navigate('/login')
        }





      } catch (error) {

        console.log(error)
      }



    }

    userget()



  }, [])


  return (
  <div className='sidebar'>
    <Navbar username={username?username.username:''}/>
    <Contacts userid ={username?username._id:''  } socket={socket}/>
  </div>
  )
}

export default sidebar