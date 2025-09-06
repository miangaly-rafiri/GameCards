import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../styles/HomePage.css";


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Le but est de remporter le plus grand nombre de cartes possible.<br /> En comparant la valeur des cartes jouées à chaque tour.</h1>
      <button onClick={() => navigate('/game')}> Commencer la partie </button>
    </div>
  );
};

export default HomePage;
