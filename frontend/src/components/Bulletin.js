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

  useEffect(() => {
    fetchPosts();
    fetchClubs();
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      const userData = JSON.parse(authCookie);
      setUserData(userData);
      console.log('User data from cookie: ', userData);
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/bulletin/posts', {
        params: { userId: user.id },
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
      await axios.post('/bulletin/createPost', {
        content: newPostContent,
        userId: user.id,
        clubId: selectedClub,
        location: `${building} ${roomNumber}`,
      });

      fetchPosts();
      setNewPostContent('');
      setSelectedClub('');
      setBuilding('');
      setRoomNumber('');
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

      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ backgroundColor: 'white', color: 'black', padding: '10px', marginBottom: '10px' }}>
            <p>{post.content}</p>
            <small>
              Posted by {post.username} on {post.timestamp}
            </small>
          </div>
        ))}
      </div>

      <div>
        <h3>Create a New Post</h3>
        <label style={{ marginRight: '10px' }}>Select Club:</label>
        <select
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        >
          <option value="">Select a Club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>

        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Enter your post content..."
          style={{ marginBottom: '10px', padding: '5px' }}
        />

        <label style={{ marginRight: '10px' }}>Enter Building and Room Number:</label>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            placeholder="Building"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="Room Number"
            style={{ padding: '5px' }}
          />
        </div>

        <button onClick={handleCreatePost} style={{ backgroundColor: '#2ecc71', color: 'white', padding: '8px', cursor: 'pointer' }}>
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Bulletin;
