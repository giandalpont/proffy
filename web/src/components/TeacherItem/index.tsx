import React from 'react'

import whatsappIcon from '../../assets/icon/whatsapp.svg'
import './styles.css'

function TeacherItem() {
  return (
    <main>
      <article className="teacher-item">
        <header>
          <img src="https://avatars0.githubusercontent.com/u/35267440?s=460&u=dbc4b151478e06291f3048d65f9cfc58c9515a3f&v=4" alt="Gian Dal Pont"/>
          <div>
            <strong>Gian Dal Pont</strong>
            <span>Física</span>
          </div>
        </header>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iure debitis nesciunt enim explicabo reiciendis. Alias, ipsum repudiandae. Aut, ad suscipit. Distinctio accusantium asperiores doloremque numquam obcaecati consequuntur sapiente sint.</p>
        <footer>
          <p>
            preço/hora
            <strong>R$ 80,00</strong>
          </p> 
          <button type="button">
            <img src={whatsappIcon} alt="WhatsApp"/>
            Entrar em contato
          </button>
        </footer> 
      </article>
    </main>
  )
}

export default TeacherItem