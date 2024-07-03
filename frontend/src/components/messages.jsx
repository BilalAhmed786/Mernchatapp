import React, { useContext } from 'react'
import Message from './message'
import Input from './input'
import Welcome from './welcome'
import { Contextapi } from '../../context/contextapi'

const messages = ({socket}) => {
    const data = useContext(Contextapi)


    return (
        <>
            {!data.data.chatuserid ?
                <div className='messages'>
                    <Welcome />
                   
                </div>

                :
                <div className='messages'>
                    <Message />
                    <Input socket={socket}/>
                </div>

            }

        </>
    )
}

export default messages