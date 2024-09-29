import React, { useState, useEffect } from 'react';
import logo from '../assets/images/7a34207c-b9f5-4735-85b7-d2aa5ffe4ea2.png';
import image from '../assets/images/image_landing_page.png';

const LandingPage = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="landing-page">
      <div className={`landing-content ${isVisible ? 'visible' : ''}`}>
        <img src={logo} alt="SWISP GPT Logo" className="logo animate-float" />
        <h1 className="animate-fade-in">SWISP GPT</h1>
        <h2 className="animate-fade-in-delay">Fueling Your Creative Imagination</h2>
        <div className="main-image-container animate-scale-in">
          <img src={image} alt="Creative Imagination" className="main-image" />
        </div>
        <p className="animate-fade-in-delay-2">Discover a world of imagination by interacting with our chatbot</p>
        <button onClick={onGetStarted} className="get-started-btn animate-pulse">
          Begin Your Adventure
        </button>
      </div>
    </div>
  );
};

export default LandingPage;