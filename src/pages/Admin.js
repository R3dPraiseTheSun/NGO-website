import React, { useState } from 'react';
import PostForm from '../components/PostForm';
import AdminPostList from '../components/AdminPostList';
import '../styles/Admin.css';

const Admin = ({ authenticated }) => {
  const [editPost, setEditPost] = useState(null);

  if (!authenticated) {
    return window.location.href = '/login';
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-content">
        <PostForm editPost={editPost} setEditPost={setEditPost} />
        <AdminPostList setEditPost={setEditPost} />
      </div>
    </div>
  );
};

export default Admin;