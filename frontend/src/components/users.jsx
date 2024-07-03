import React, { useContext, useEffect, useState } from 'react';
import image from '../image/download.jpg';
import { BsFillCircleFill } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Contextapi } from '../../context/contextapi';

const Contacts = ({ userid, socket }) => {
    const { dataUsers } = useContext(Contextapi);
    const [username, setUsername] = useState('');
    const [datauser, setDatauser] = useState([]);
    const [data, setAllMessageData] = useState([]);
    const [activeChatUser, setActiveChatUser] = useState(null);

    const handleUser = (name, id, status) => {
        if (activeChatUser !== id) {
            socket.emit('msgreview', { receiverid: userid, senderid: activeChatUser }); // Mark messages as reviewed for the previous chat user
        }
        setActiveChatUser(id);
        socket.emit('msgreview', { receiverid: userid, senderid: id }); // Mark messages as reviewed for the new chat user
        dataUsers({ username: name, chatuserid: id, Loginuser: userid, userstatus: status });
    };

    useEffect(() => {
        socket.on('userlastchat', (msg) => {
            setAllMessageData(msg);
        });

        return () => {
            socket.off('userlastchat');
        };
    }, [socket]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const user = await axios.get(`/api/register?name=${username}&userid=${userid}`);
                if (user) {
                    setDatauser(user.data.Users);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (userid) {
            fetchAllUsers();
        }
    }, [datauser,userid]);

    const truncateString = (text, maxLength) => {
        return text && text.length > maxLength ? `${text.substring(0, maxLength)} ..` : text;
    };

    return (
        <>
            <div className='search'>
                <div className='searchform'>
                    <input
                        type='text'
                        placeholder='search user'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className='contactwraper'>
                {datauser.map((alluser, index) => (
                    <div
                        onClick={() => handleUser(alluser.username, alluser._id, alluser.status)}
                        className='userchat'
                        key={index}
                    >
                        <img src={image} alt="" />
                        <div className='userchatinfo'>
                            <span>{alluser.username}</span>
                            <span>{alluser.status === 'online' ? <BsFillCircleFill className="green-light-icon" /> : null}</span>

                            {data.filter(chat =>
                                (chat.receiver._id === alluser._id && chat.sender._id === userid) ||
                                (chat.receiver._id === userid && chat.sender._id === alluser._id)
                            ).map((chat, idx, array) => (
                                idx === array.length - 1 && chat.isreviewed === false && chat.contenttype === 'text' ? (
                                    <p className='m-1 font-extrabold' key={idx}>{truncateString(chat.content[0], 50)}</p>
                                ) : idx === array.length - 1 && chat.isreviewed === true && chat.contenttype === 'text' ? (
                                    <p className='m-1' key={idx}>{truncateString(chat.content[0], 50)}</p>
                                ) : idx === array.length - 1 && chat.contenttype === 'file' ? (
                                    <div><FontAwesomeIcon className='text-xs ml-1' icon={faFile} style={{ color: 'green' }} /></div>
                                ) : null
                            ))}

                            {(() => {
                                const filteredChatCount = data.filter(chat =>
                                    chat.receiver._id === userid &&
                                    chat.sender._id === alluser._id &&
                                    chat.isreviewed === false
                                ).length;

                                return filteredChatCount > 0 && activeChatUser !== alluser._id ? (
                                    <span className='receivenotify'>{filteredChatCount}</span>
                                ) : null;
                            })()}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Contacts;
