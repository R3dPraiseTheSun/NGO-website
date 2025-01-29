import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PostList.css';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [featuredPost, setFeaturedPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://ngo-backend-wh0k.onrender.com/api/posts');
                let allPosts = response.data;

                if (!Array.isArray(allPosts)) {
                    allPosts = Object.values(allPosts)[0];
                }

                // Find featured post (you could add an 'isFeatured' field to your Post model)
                const featured = allPosts.find(post => post.isFeatured) || allPosts[0];
                setFeaturedPost(featured);

                // Filter out featured post from regular posts
                const regularPosts = allPosts.filter(post => post.id !== featured?.id);
                regularPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

                setPosts(regularPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className="loading-container">Loading posts...</div>;
    }

    return (
        <div className="post-grid">
            {/* Featured Post */}
            {featuredPost && (
                <motion.div
                    key={featuredPost.id}
                    className="featured-post"
                    layoutId={`post-${featuredPost.id}`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="post-image">
                        <img
                            src={featuredPost.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'}
                            alt={featuredPost.title}
                        />
                    </div>
                    <div className="post-content">
                        <span className="post-category highlight">
                            {featuredPost.category || 'Featured'}
                        </span>
                        <h2>{featuredPost.title}</h2>
                        <p className="post-excerpt">
                            {featuredPost.content.substring(0, 150)}...
                        </p>
                        <button
                            onClick={() => navigate(`/blog/${featuredPost.id}`, { state: {post: featuredPost} })}
                            className="read-more-button"
                        >
                            Read More
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Regular Posts */}
            {posts.map(post => (
                <motion.div
                    key={post.id}
                    layoutId={`post-${post.id}`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="post-header">
                        <span className="post-category">
                            {post.category || 'General'}
                        </span>
                        <span className="post-date">
                            {format(new Date(post.date), 'MMMM dd, yyyy')}
                        </span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">
                        {post.content.substring(0, 100)}...
                    </p>
                    <button
                        onClick={() => navigate(`/blog/${post.id}`, { state: { post } })}
                        className="read-more-button"
                    >
                        Read More
                    </button>
                </motion.div>
            ))}
        </div>
    );
};

export default PostList;