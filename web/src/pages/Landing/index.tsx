import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import landingImg from '../../assets/landing.svg';
import studyIcon from '../../assets/icon/study.svg';
import giveClassesIcon from '../../assets/icon/give-classes.svg';
import purpleHeartIcon from '../../assets/icon/purple-heart.svg';

import './styles.min.css'

function Landing () {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then( response => {
      const { total } = response.data;

      setTotalConnections(total);
    }) 
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy"/>
          <h2>Sua plataforma de estudos online</h2>
        </div>
        <img 
          className="hero-image" 
          src={landingImg} 
          alt="Plataforma de estudos"
        />
        <div className="buttons-container">
          <Link to="/study" className="study" >
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/> 
            Dar aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração"/>
        </span>
      </div>
    </div>
  )
}

export default Landing
