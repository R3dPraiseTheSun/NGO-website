import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Linkify from 'react-linkify';

import '../styles/DetailedPostView.css';

const DetailedPostView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { postId } = useParams();

    // Get post data from navigation state or fetch from API
    const post = location.state?.post || undefined;

    const handleClose = () => navigate(-1);

    return (
        <motion.div
            className="detailed-post-overlay"
            layoutId={`post-${postId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className="detailed-content">

                <div className="post-header">
                    <button className="close-button" onClick={handleClose}>×</button>
                    <span className="post-category">
                        {post.category || 'General'}
                    </span>
                    <span className="post-date">
                        {format(new Date(post.date), 'MMMM dd, yyyy')}
                    </span>
                </div>

                <h1 className="post-title">{post.title}</h1>
                <div className="post-content">
                    <Linkify>{post.content}</Linkify>
                </div>

                <div className="post-gallery">
                    {post.images?.map((imgUrl, index) => (
                        <img
                            key={index}
                            src={imgUrl}
                            alt={`Post content ${index + 1}`}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

const extractFileId = (url) => {
    const match = url.match(/\/d\/([^/]+)/);
    return match ? match[1] : url;
  };

export default DetailedPostView;