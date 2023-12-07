import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Bulletin = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [building, setBuilding] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [clubs, setClubs] = useState([]);
  const [name, setName] = useState('');
  const[clubName, setClubName] = useState('');

  useEffect(() => {
    fetchClubs();
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      const userData = JSON.parse(authCookie);
      setUserData(userData);
      console.log('User data from cookie: ', userData);
      fetchPosts() ;  
    }
  }, [user]);

  const fetchPosts = async () => {
  try {
    const response = await axios.get('/bulletin/posts', {
      params: { name: name },
    });
    setPosts(response.data.posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

  const fetchClubs = async () => {
    try {
      const response = await axios.get('/bulletin/clubs');
      setClubs(response.data.clubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };


  const handleCreatePost = async () => {
  try {
    const email = userData.email;
    if(name === userData.name){
    await axios.post('/bulletin/createPost', {
      content: newPostContent,
      clubId: selectedClub,
      building,
      roomNumber,
      email,
      userId: userData.id,
      name,
      clubName: clubName
    });
    }else{
      console.error("name isn't right");
    }
    await fetchPosts(); 
    setNewPostContent('');
    setSelectedClub('');
    setBuilding('');
    setRoomNumber('');
    setName('');
  } catch (error) {
    console.error('Error creating post:', error);
  }
};


 return (
    <div style={{ backgroundColor: '#3498db', color: 'white', padding: '20px', minHeight: '100vh' }}>
      {userData && (
        <div>
          <h2>{userData.name}'s Bulletin Board!</h2>
        </div>
      )}

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: '50%',
            marginBottom: '20px',
            border: '2px solid white',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Create a New Post</h3>
          <form>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Club:</label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="Club Name"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Building:</label>
              <input
                type="text"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="Building"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Room Number:</label>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Room Number"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Post Content:</label>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Enter your post content..."
                style={{ ...inputStyle, height: '100px' }}
              />
            </div>

            <button
              onClick={handleCreatePost}
              style={{ backgroundColor: '#C4B454', color: 'white', padding: '12px', cursor: 'pointer' }}
            >
              Create Post
            </button>
          </form>
        </div>

        <div style={{ width: '50%' }}>
        <h3 style={{ textAlign: 'center' }}>Recent Posts</h3>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '20px',
              marginBottom: '20px',
              border: '2px solid #3498db',
              borderRadius: '10px',
              width: '100%', 
              boxSizing: 'border-box', 
            }}
          >
            <p style={{ fontSize: '16px', marginBottom: '10px', textAlign: 'center' }}>{post.content}</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic', textAlign: 'center' }}>
              Posted by {post.name} | Club: {post.club_name} | Building: {post.building} | Room Number: {post.room_number}
            </p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default Bulletin;