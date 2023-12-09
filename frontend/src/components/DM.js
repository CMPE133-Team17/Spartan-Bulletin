import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import '../DM.css';
import Cookies from 'js-cookie';
import {format} from 'timeago.js';
import {useNavigate} from 'react-router-dom';

//TODO: List friends on the left side and have a chat screen on the right side
//For the friends list, have a profile pics(optional) display to the left of their names

const DM = ({user, socket}) => {

  const [msg, setMsg] = useState('');
  const [chats, setChats] = useState(null);
  const [friends, setFriends] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [userData, setUserData] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const authCookie = Cookies.get('auth');
    if (authCookie) {
      const userData = JSON.parse(authCookie);
      setUserData(userData);
      console.log('User data from cookie: ', userData);
  
      const fetchFriends = async () => {
        try {
          const response = await axios.get('/api/getFriends', {
            params: { username: userData.name }
          });
          setFriends(response.data);
        } catch (err) {
          console.error('Error fetching data: ', err);
        }
      };
  
      fetchFriends();
    } else {
      navigate('/login');
    }
  }, [user]);
  

//fetch correct chat history with the selected user by roomId
  const fetchMessages = async (rec, id) => {
    try {
      const response = await axios.post('/api/getMsg', { username: userData.name, id: id});
      setChats(response.data);
      setRecipient(rec);
    } catch (err) {
      console.error('Error fetching messages: ', err);
    }
  };  

  //emit the message to the sender and the reciever and adds new message into the db
  const addMessage = async () => {
    if (msg != null) {
      const msgData = {
        room: roomId,
        message: msg,
        date:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
        sender: userData.name
      };
      await socket.emit('send_message', msgData);
      setChats((chats) => [...chats, msgData]);
      await axios.post("/api/addMsg", {message : msg, username: userData.name, friend: recipient, id: roomId});
    }
  }

  useMemo(() => {
    socket.on('receive_message', (data) => {
      setChats((chats) => [...chats, data]);
    })
  }, [socket]);

  //assign 2 users to a chat room
  const joinRoom = () => {
    if (recipient !== null && roomId !== null) {
      socket.emit('join_room' , roomId);
    }
  }

  const handleClick = (id, friend) => {
    fetchMessages(friend, id);
    setRoomId(id); 
    joinRoom();
  }

  return (
    <>
      <div className="dm">
        <div className="friends">
          {userData && (
            <div>
              <h3>{userData.name}'s Inbox</h3>
            </div>
          )}

          <input className='searchFriend' placeholder='Search for friends'/>
          {friends.map(fren => (
            fren.user1 !== userData.name ? (
              <>
                <div className='chatHistory' key={fren.user1} onClick={() => {handleClick(fren.id, fren.user1)}}>
                  <img className='convoImg' src={require("../conversation_photo.png")} alt='spartan'/>
                  <span className='names'> {fren.user1} </span>
                </div>
              </>
            ) : (
              <>
                <div className='chatHistory' key={fren.user2} onClick={() => {handleClick(fren.id, fren.user2)}}>
                  <img className='convoImg' src={require("../conversation_photo.png")} alt='spartan'/>
                  <span className='names'> {fren.user2} </span>
                </div>
              </>
            )
              
            ))}
        </div>
        <div className="inbox">
          <div className='inboxWrapper'>

            {/*IF THERES NO RECIPIENT, A MESSAGE WILL BE DISPLAYED */} 
            {recipient ? 
            <>
            <div className='chat-header'>
            <img className='profilePic' src={require("../conversation_photo.png")} alt=''/>
            <h2>{recipient}</h2>
          </div>
            <div className='convo'>
              
           {/*if there's no chat history then it displays a message*/}
            {chats && chats.length > 0 ? (
              chats.map((chat) => (
                //IF SENDER IS NOT THE CURRENT USER THEN DIPLAY THE BUBBLE TO THE LEFT OF THE SCREEN
                chat.sender !== userData.name ? (
                  <div className='bubble' key={chat.id} style={{display:'flex', flexDirection:'column', width:'100%', marginBottom:'10px', paddingLeft:'10px'}}>
                    <div className='bubbles' style={{justifyContent:'flex-end', maxWidth:'50%', width:'max-content'}}>
                      <p className='messageText' >{chat.message}</p>
                      <div className='timestamp'>
                        {format(chat.date)}
                      </div>
                    </div>
                    
                  </div> 
                ): (
                  <div className='bubble own' key={chat.id} style={{display:'flex', flexDirection:'column', width:'100%', marginBottom:'10px', alignItems:'flex-end', paddingRight:'10px'}} >
                    <div className='bubbles' style={{maxWidth:'50%', width:'max-content'}}>
                      <p className='messageText' >{chat.message}</p>
                      <p className='timestamp'>{format(chat.date)}</p>
                    </div>
                    
                  </div> 
                )
                
              ))) : (<p>No chats available</p>)}
            </div> 
            </>
            : <span>Open a chat to start a conversation!</span>}
            
            <div className='inputBar'>
              <input type='text' value={msg} className='chatInput' 
              onChange={(event) => {
                setMsg(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addMessage();
                  setMsg("");
                }
              }}/>
              <button className='sendButton' onClick={() => {addMessage(); setMsg("");}}>send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DM
