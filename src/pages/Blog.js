import React from 'react';
import PostList from '../components/PostList';
import '../styles/Blog.css';

const Blog = () => {
  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1>Our Latest Updates</h1>
          <p>Stay informed about our projects and community impact</p>
        </div>
      </section>
      
      <div className="blog-container">
        <PostList />
      </div>
    </div>
  );
};

export default Blog;