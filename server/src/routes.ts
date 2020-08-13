import express, { request } from 'express';
import db from './database/connection';
import convertHourToMinuts from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post('/classes', async (request, response) => {
  // pegando corpo da requisição
  const {
    name, avatar, whatsapp, bio,  
    subject, cost, 
    schedule
  } = request.body;

  //  Ultizando transection para tratamento de erro de inserção, se acasso alguma tabela não iserir os dados coretamente
  const trx = await db.transaction();
  
  // Inserindo na tabela users e pegando retorno
  const insertedUserid = await trx('users').insert({
    name, avatar, whatsapp, bio 
  });

  // pegando id do user inserido
  const user_id = insertedUserid[0];

  // salvando tabela relacionada e pegando retorno
  const insertedClassesIds = await trx('classes').insert({
    subject, cost, user_id
  })
 
  // pegando id da classes inserida
  const class_id = insertedClassesIds[0];

  // Passa pelo schedule pegando week_day, from, to and class_id
  const classSchedule = schedule.map((item: ScheduleItem) => {
    return {
      class_id,
      week_day: item.week_day,
      from: convertHourToMinuts(item.from),
      to: convertHourToMinuts(item.to),
    }
  })

  // Salvando na tabela class_schedule
  await trx("class_schedule").insert(classSchedule)

  //  vai fazer as alterações no banco de dados
  await trx.commit();

  return response.send();
})

export default routes;
