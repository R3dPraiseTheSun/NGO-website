import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPostList.css';

const AdminPostList = ({ setEditPost }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://ngo-backend-wh0k.onrender.com/api/posts');
                
                let allPosts = response.data;

                if (!Array.isArray(allPosts)) {
                    allPosts = Object.values(allPosts)[0];
                }

                setPosts(allPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = (postId) => {
        // API delete call
        setPosts(posts.filter(post => post.id !== postId));
    };

    if (loading) {
        return <div className="loading-container">Loading posts...</div>;
    }

    return (
        <div className="admin-post-list">
            <h2>Manage Posts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.date}</td>
                            <td className="actions">
                                <button
                                    className="edit-button"
                                    onClick={() => setEditPost(post)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPostList;