import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Bulletin = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    fetchPosts();
    const authCookie = Cookies.get('auth');
    console.log(JSON.parse(authCookie));
  if (authCookie) {
    const userData = JSON.parse(authCookie);
    setUserData(userData);
    console.log('User data from cookie: ', userData);
}
  }, [user]);

  const fetchPosts = async () => {
    try {

      const response = await axios.get('/api/posts', {
        params: { userId: user.id }, 
      });

      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post('/api/createPost', {
        content: newPostContent,
        userId: user.id,
        clubId: user.clubs[0].id, 
      });

      fetchPosts();
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
     {userData && (
          <div>
            <h2>{userData.name}'s Bulletin Board!</h2>
          </div>
        )}

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
            <small>Posted by {post.username} on {post.timestamp}</small>
          </div>
        ))}
      </div>

      <div>
        <h3>Create a New Post</h3>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Enter your post content..."
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  );
};

export default Bulletin;