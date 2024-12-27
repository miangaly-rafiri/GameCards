import React from 'react';
import { useNavigate } from 'react-router-dom'; // pour les routes et navigeur dans les routes
import "../styles/HomePage.css";


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Jeu de Bataille</h1>
      <p> Le but est de remporter le plus grand nombre de cartes possible, <br /> en comparant la valeur des cartes jouées à chaque tour.</p>
      <button onClick={() => navigate('/game')}>Commencer la partie</button>
    </div>
  );
};

export default HomePage;
