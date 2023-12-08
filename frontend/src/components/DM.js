import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../DM.css';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

//TODO: List friends on the left side and have a chat screen on the right side
//For the friends list, have a profile pics(optional) display to the left of their names

const DM = ({user}) => {

  const [msg, setMsg] = useState(null);
  const [chats, setChats] = useState(null);
  const [friends, setFriends] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [userData, setUserData] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const socket = io.connect('http://localhost:4000', {
    withCredentials: true
  });

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
          setRoomId(response.data[0].id);
        } catch (err) {
          console.error('Error fetching data: ', err);
        }
      };
  
      fetchFriends();

    }
  }, [user]);

  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setChats((chats) => [...chats, data]);
  //   })
  // }, [socket])
  

  const fetchMessages = async () => {
    try {
      const response = await axios.post('/api/getMsg', { username: userData.name, id: roomId});
      setChats(response.data);
    } catch (err) {
      console.error('Error fetching messages: ', err);
    }
  };  

  const addMessage = async () => {
    if (msg != null) {
      const msgData = {
        room: roomId,
        message: msg
      };
      await socket.emit('send_message', msgData);
      setChats((chats) => [...chats, msgData]);
      axios.post("/api/addMsg", {message : msg, username: userData.name, friend: recipient, id: roomId});
    }
  }

  const joinRoom = () => {
    if (recipient !== null && roomId !== null) {
      socket.emit('join_room' , roomId);
    }
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
                <div className='chatHistory' key={fren.user1} onClick={() => {setRecipient(fren.user1);fetchMessages();setRoomId(fren.id); joinRoom()}}>
                  <img className='convoImg' src={require("../conversation_photo.png")} alt='spartan'/>
                  <span className='names'> {fren.user1} </span>
                </div>
              </>
            ) : (
              <>
                <div className='chatHistory' key={fren.user2} onClick={() => {setRecipient(fren.user2);fetchMessages();setRoomId(fren.id); joinRoom()}}>
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
                  <div className='bubble' key={chat.id}>
                    <div className='bubbles'>
                      <p className='messageText' >{chat.message}</p>
                      <div className='timestamp'>
                        {chat.date}
                      </div>
                    </div>
                    
                  </div> 
                ): (
                  <div className='bubble own' key={chat.id}>
                    <div className='bubbles'>
                      <p className='messageText' >{chat.message}</p>
                      <div className='timestamp'>
                        {chat.date}
                      </div>
                    </div>
                    
                  </div> 
                )
                
              ))) : (<p>No chats available</p>)}
            </div> 
            </>
            : <span>Open a chat to start a conversation!</span>}
            
            <div className='inputBar'>
              <textarea className='chatInput' onChange={(event) => {
                setMsg(event.target.value);
              }}/>
              <button className='sendButton' onClick={addMessage}>send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DM
