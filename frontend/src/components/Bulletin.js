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
      name
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
      <div style={{ width: '50%', marginBottom: '20px', border: '2px solid white', borderRadius: '10px', padding: '20px' }}>
        <h3>Create a New Post</h3>
        <form style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Select Club:</label>
            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              style={{ padding: '8px', marginRight: '20px' }}
            >
              <option value="">Select a Club</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Building:</label>
            <input
              type="text"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder="Building"
              style={{ marginRight: '10px', padding: '8px' }}
            />

            <label style={{ marginRight: '10px' }}>Room Number:</label>
            <input
              type="int"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Room Number"
              style={{ padding: '8px' }}
            />
          </div>

          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              style={{ marginRight: '10px', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Post Content:</label>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Enter your post content..."
              style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
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
        <h3>Recent Posts</h3>
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
            }}
          >
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{post.content}</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic' }}>
              Posted by {post.name} | Club: {selectedClub} | Building: {post.building} | Room Number: {post.room_number}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);



};

export default Bulletin;