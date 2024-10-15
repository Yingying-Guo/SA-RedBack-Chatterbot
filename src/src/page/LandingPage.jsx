import React, { useState, useEffect } from 'react';
import logo from '../assets/images/ebbecad5-4964-4733-97e7-b2a0085ae42f.png';
import image from '../assets/images/image_landing_page.png';
import TeamPage from './TeamPage'; // Import the TeamPage component

const LandingPage = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTeamPageVisible, setIsTeamPageVisible] = useState(false); // State to manage TeamPage visibility

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleTeamPage = () => {
    setIsTeamPageVisible(!isTeamPageVisible); // Toggle TeamPage visibility
  };

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
        <p></p>
        <button onClick={toggleTeamPage} className="get-started-btn animate-pulse">
          About Us
        </button>
      </div>

      {isTeamPageVisible && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={toggleTeamPage}>
              &times;
            </button>
            <TeamPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
