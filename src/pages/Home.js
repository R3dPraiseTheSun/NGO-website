import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Together We Can Make a Difference</h1>
          <p>Join us in creating sustainable change for communities in need</p>
          <button className="cta-button">Donate Now</button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p className="mission-statement">
            We are dedicated to improving lives through education, healthcare, 
            and community development initiatives across developing nations.
          </p>
          <button className="learn-more-button">Learn More</button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>15K+</h3>
            <p>People Helped</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Communities</p>
          </div>
          <div className="stat-card">
            <h3>200+</h3>
            <p>Volunteers</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;