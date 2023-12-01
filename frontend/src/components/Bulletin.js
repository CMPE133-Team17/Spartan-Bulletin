import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bulletin = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Make an API call to get bulletin board posts based on user's clubs of interest
      const response = await axios.get('/api/posts', {
        params: { userId: user.id }, // Assuming your backend supports fetching posts by user ID
      });

      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      // Make an API call to create a new bulletin board post
      await axios.post('/api/createPost', {
        content: newPostContent,
        userId: user.id,
        clubId: user.clubs[0].id, // Assuming a user is associated with at least one club
      });

      // Refetch posts after creating a new post
      fetchPosts();
      // Clear the input field
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Bulletin Board</h2>

      {/* Display posts */}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
            <small>Posted by {post.username} on {post.timestamp}</small>
          </div>
        ))}
      </div>

      {/* Allow users to create posts */}
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
