import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../DM.css';

//TODO: List friends on the left side and have a chat screen on the right side
//For the friends list, have a profile pics(optional) display to the left of their names

const DM = () => {

  const [msg, setMsg] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const res = await axios.get('http://localhost:3000/DM');
        setChats(res.data);
      } catch(err) {
        console.log(err);
      }
    }
    fetchAllChats();
  }, []);

  const addMessage = () => {
    axios.post("http://localhost:3000/addMsg", {message : msg})
  }


  return (
    <>
      <div className="dm">
        <div className="friends">
          <h3>Friends</h3>
          <ul>
            <li></li>
          </ul>
        </div>
        <div className="chat">
          <div className='chatHistory'>
          {chats.map(chat => (
				    <div>
              <p>{chat.sender}</p>
					    <p>{chat.message}</p>
              <p>{chat.date}</p>
				    </div>
			    ))}
          </div>
          <div className='input'>
            <input onChange={(event) => {
              setMsg(event.target.value);
            }}>
            </input>
            <button onClick={addMessage}>send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DM