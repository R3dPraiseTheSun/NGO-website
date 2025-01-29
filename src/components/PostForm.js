import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PostForm.css';

const PostForm = ({ editPost, setEditPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
      setCategory(editPost.category || 'General');
    }
  }, [editPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, content, category };
    
    if (editPost) {
      // Update existing post
      axios.put(`/api/posts/${editPost.id}`, postData)
        .then(() => {
          setEditPost(null);
          // Update state or refetch posts
        });
    } else {
      // Create new post
      axios.post('/api/posts', postData)
        .then(() => {
          // Clear form and update posts
          setTitle('');
          setContent('');
          setCategory('General');
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>{editPost ? 'Edit Post' : 'Create New Post'}</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Projects">Projects</option>
          <option value="Events">Events</option>
          <option value="Education">Education</option>
        </select>
      </div>
      <div className="form-group">
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="6"
        />
      </div>
      <button type="submit" className="submit-button">
        {editPost ? 'Update Post' : 'Create Post'}
      </button>
      {editPost && (
        <button
          type="button"
          className="cancel-button"
          onClick={() => setEditPost(null)}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default PostForm;