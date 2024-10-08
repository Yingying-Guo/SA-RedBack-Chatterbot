import React from 'react';

const suggestions = [
  {
    id: 'sustainability',
    title: 'Sustainability and Climate Change',
    iconClass: 'clarity-plane-line'
  },
  {
    id: 'university',
    title: 'University of Melbourne',
    iconClass: 'group-39'
  },
  {
    id: 'ai',
    title: 'AI and Machine Learning',
    iconClass: 'carbon-idea'
  },
  {
    id: 'diversity',
    title: 'Diversity and Inclusion',
    iconClass: 'projector-screen-light'
  }
];

const Suggestions = ({ onTopicClick }) => (
  <div className="suggestions-container">
    <div className="suggestions-icon" />
    <div className="suggestions-grid">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="suggestion-box" onClick={() => onTopicClick(suggestion.title)}>
          <div className={`suggestion-icon ${suggestion.iconClass}`} />
          <span className="suggestion-text">
            {suggestion.title}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Suggestions;