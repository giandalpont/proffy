import React from 'react'

import whatsappIcon from '../../assets/icon/whatsapp.svg'
import './styles.css'

export interface TeacherProps {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  cost: number;
  subject: string;
  whastapp: string;
}

interface TeacherItemProps {
  teacher: TeacherProps;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  return (
    <main>
      <article className="teacher-item">
        <header>
          <img src={teacher.avatar} alt={teacher.name}/>
          <div>
            <strong>{teacher.name}</strong>
            <span>{teacher.subject}</span>
          </div>
        </header>
        <p>{teacher.bio}</p>
        <footer>
          <p>
            preço/hora
            <strong>R$ {teacher.cost}</strong>
          </p> 
          <a href={`https://wa.me/${teacher.whastapp}`} type="button">
            <img src={whatsappIcon} alt="WhatsApp"/>
            Entrar em contato
          </a>
        </footer> 
      </article>
    </main>
  )
}

export default TeacherItem