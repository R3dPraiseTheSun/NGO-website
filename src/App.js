import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Auth from './components/Auth';
import Navbar from './components/Navbar';
import DetailedPostView from './components/DetailedPostView'
import Home from './pages/Home';
import Blog from './pages/Blog';
import Admin from './pages/Admin';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AnimatePresence mode='wait'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<DetailedPostView />} />
          <Route path="/login" element={<Auth setAuthenticated={setAuthenticated} />} />
          <Route path="/admin" element={<Admin authenticated={authenticated} />} />
        </Routes>
      </Router>
    </AnimatePresence>
  );
};

export default App;