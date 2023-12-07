// BulletinViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const BulletinViewer = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchPosts();
  }, [user]);

  const fetchUserData = async () => {
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      const userData = JSON.parse(authCookie);
      setUserData(userData);
      console.log('User data from cookie: ', userData);
    }
  };

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

  return (
    <div style={{ backgroundColor: '#3498db', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {userData && (
        <div>
          <h2>{userData.name}'s Bulletin Board</h2>
        </div>
      )}

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
  );
};

export default BulletinViewer;