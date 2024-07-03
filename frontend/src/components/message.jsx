import React, { useContext, useEffect, useRef } from 'react'
import { Contextapi } from '../../context/contextapi'
import { BsDownload} from 'react-icons/bs';
import { GrDocumentText } from "react-icons/gr";

const message = () => {


  const data = useContext(Contextapi)
  const lastMessageRef = useRef(null);

  

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  //for image download
  const downloadImage = (imageName) => {
    // Construct the full URL for the image
    const imageUrl = `http://localhost:4000/uploads/${imageName}`;

    // Trigger a download request
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', imageName);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => console.error('Error downloading image:', error));
  };

  const isImage = (filename) => {
    // Check if the file extension is an image format
    return /\.(jpeg|jpg|gif|png)$/i.test(filename);
  };




  return (
    <div className='messagescontainer'>

      {data?data.chatdata.map((users, index) => (
        <div key={index} className='messagewraper' ref={index === data.chatdata.length - 1 ? lastMessageRef : null}>

          {users.sender._id === data.data.Loginuser ?

            <div className='Loginusermessages' >
              <p className='p-1 pl-2 text-sm font-semibold font-serif  text-orange-600'><i>You</i></p>
              {users.contenttype === 'text' ? <p className='p-1 pl-2 m-2 text-sm'> {users.content}</p>
                : isImage(users.content) ? <div><img src={`http://localhost:4000/uploads/${users.content}`} />
                  <BsDownload className='m-2 text-cyan-600 font-extrabold cursor-pointer' onClick={() => downloadImage(users.content)} /></div>
                  : <div className='mt-2'><GrDocumentText size={100} /><p className='p-2'>{users.content}</p><BsDownload className='m-2 text-cyan-600 font-extrabold cursor-pointer' onClick={() => downloadImage(users.content)} /></div>}
              <p className='p-1 pl-2 m-2 text-xs'>{users.timestamp}</p>
            </div>
            :
            <div className='chatusermessages'>
              <p className='p-1 pl-2 text-sm font-semibold text-red-600'>{users.sender.username}</p>
              {users.contenttype === 'text' ? <p className='p-1 pl-2 m-2 text-sm'> {users.content}</p>
                : isImage(users.content) ? <div><img src={`http://localhost:4000/uploads/${users.content}`} />
                  <BsDownload className='m-2 text-cyan-600 font-extrabold cursor-pointer' onClick={() => downloadImage(users.content)} /></div>
                  : <div className='mt-2'><GrDocumentText size={100} /><p className='p-2'>{users.content}</p><BsDownload className='m-2 text-cyan-600 font-extrabold cursor-pointer' onClick={() => downloadImage(users.content)} /></div>}
              <p className=' p-1 pl-2 m-2 text-xs'>{users.timestamp}</p>
            </div>

          }
        </div>
      )) : null}
    </div>

  )
}

export default message