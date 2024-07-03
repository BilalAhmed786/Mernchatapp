import React, { useContext, useEffect, useState } from 'react'
import Messages from './messages'
import { Contextapi } from '../../context/contextapi'

const individual = ({socket}) => {
    const data = useContext(Contextapi)
  
  return (
        <div className='individual'>

            <div className='chatInfo'>
                <span>{data.data.username}</span>
                <div className='p-1'>
                <span className='text-xs'>{data.data.userstatus === "online"?data.data.userstatus:null}</span>
                </div>

            </div>
            
            <div>
                <Messages socket={socket} />

            </div>

        </div>
    )
}

export default individual