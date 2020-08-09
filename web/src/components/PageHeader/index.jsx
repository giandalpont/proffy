import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import backIcon from '../../assets/icon/back.svg'
import logoImg from '../../assets/logo.svg'

function PageHeader() {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar"/>
        </Link>
        <img src={logoImg} alt="Proffy"/>
      </div>
      <div className="header-content">
        <strong>Esses são os Proffy disponíveis.</strong>
      </div>
    </header>
  )
}

export default PageHeader