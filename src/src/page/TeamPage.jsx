import React from 'react';
import Carousel from './Carousel';

const teamMembers = [
  {
    name: 'Yiyao Li (Shaelyn)',
    title: 'Product Manager',
    imageUrl: 'src/assets/images/Yiyao Li (Shaelyn).jpg', 
  },
  {
    name: 'Yiqun Liu (Elva)',
    title: 'Scrum Master',
    imageUrl: 'src/assets/images/Yiqun Liu (Elva).jpg',
  },
  {
    name: 'Yingying Guo (Vicky)',
    title: 'Quality Assurancer',
    imageUrl: 'src/assets/images/Yingying Guo.jpg',
  },
  {
    name: ' Jionghao Song (Harry)',
    title: 'Backend Developer',
    imageUrl: 'src/assets/images/HarrySong.jpg',
  },
  {
    name: 'Leyao Lyu (Lydia)',
    title: 'Frontend Developer',
    imageUrl: 'src/assets/images/Leyao Lyu.jpg',
  },
];

const App = () => {
  return (
    <div>
      <h2>Team SA-RedBack</h2>
      <Carousel teamMembers={teamMembers} />
    </div>
  );
};

export default App;
