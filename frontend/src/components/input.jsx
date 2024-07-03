import React, { useContext, useEffect, useRef, useState } from 'react'
import { Contextapi } from '../../context/contextapi'
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill, BsPaperclip,BsFillSendFill  } from 'react-icons/bs';




const input = ({ socket }) => {
  const data = useContext(Contextapi)
    const [showPicker, setShowPicker] = useState(false);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    //for emoji

    const onEmojiClick = (event, emojiObject) => {


        setMessage(prevInput => prevInput + event.emoji);

    };

    //for text message
    const sendMessage = (e) => {
        e.preventDefault()
        
        socket.emit('chatMessage', { senderId: data.data.Loginuser, receiverId:data.data.chatuserid,contenttype:"text", content: message });
        
        setMessage('');
        
        setShowPicker(false);
    };

    //for files uplaods
   
    const handleFileUpload = (e) => {
       
        const files = e.target.files;
        
        const fileArray = Array.from(files);
        
        fileArray.forEach(file => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
          
            socket.emit('file', {senderId: data.data.Loginuser,receiverId:data.data.chatuserid,contenttype:"file",
              files: [{ name: file.name, data: reader.result}]
            });
          };
        });
    };

    const handlePinClick = (e) => {
       
        fileInputRef.current.click();
      }; 


   

    return (
        <>
                <form onSubmit={sendMessage}>
                <div className='inputcontainer'>
                    <div className='inputform'>
                      
                        <div className='input'>
                             <input type='text' placeholder='type message...' value={message} onChange={(e) => setMessage(e.target.value)}  required/>
                        </div>
                        <BsEmojiSmileFill className='absolute text-xl mt-2 ml-1  text-yellow-500 cursor-pointer' onClick={() => setShowPicker(val => !val)} />
                        <div className='emojiwraper'>

                            {showPicker && <Picker height={380} width={650} onEmojiClick={onEmojiClick} />}
                        </div>
                         
                   
                         <div><input 
                        type='file' 
                        onChange={handleFileUpload}
                        multiple
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                          />
                          </div>
                          <BsPaperclip className='absolute left-8 ml-1.5 mt-1.5 cursor-pointer' size={24} onClick={handlePinClick} />
                          
                          <button type='submit'><BsFillSendFill className='block mt-2 mr-14' size={24} /></button>
                          
                    </div>


                </div>
            
                </form>


        </>
    )
}

export default input