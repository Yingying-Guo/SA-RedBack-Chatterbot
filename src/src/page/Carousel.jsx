import React, { useState, useEffect } from 'react';
import './Carousel.css'; // For styles

const Carousel = ({ teamMembers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 2; // Show 2 team members per slide

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Automatically slide to the next pair
    }, 1800); // Change slide every 1.5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [currentIndex]);

  // Move to the next set of items
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= teamMembers.length ? 0 : prevIndex + itemsPerSlide
    );
  };

  // Move to the previous set of items
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerSlide < 0 ? teamMembers.length - itemsPerSlide : prevIndex - itemsPerSlide
    );
  };

  // Get the current slice of team members to display
  const visibleMembers = teamMembers.slice(currentIndex, currentIndex + itemsPerSlide);

  // Handle the edge case when the last slide has fewer members
  if (visibleMembers.length < itemsPerSlide) {
    visibleMembers.push(...teamMembers.slice(0, itemsPerSlide - visibleMembers.length));
  }

  return (
    <div className="carousel-container">
      <button className="arrow left-arrow" onClick={handlePrev}>
        &#10094;
      </button>
      <div className="carousel-inner">
        {visibleMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.imageUrl} alt={member.name} className="team-image" />
            <h2>{member.name}</h2>
            <h4>{member.title}</h4>
          </div>
        ))}
      </div>
      <button className="arrow right-arrow" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
