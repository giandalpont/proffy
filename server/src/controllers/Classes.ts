import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinuts from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}


export default class ClassesController {

  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if(!week_day || !subject || !time) {
      return response.status(400).json({
        error: 'Missing filter to search classes'
      })
    }

    const timeInMinutes = convertHourToMinuts(time);

    const classes = await db('classes')
      .whereExists(function(){
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day`= ??',[Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject) // busca na tabela classes
      .join('users','classes.user_id','=', 'users.id') // busca usuario
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }


  async create(request: Request, response: Response) {
    // pegando corpo da requisi��o
    const {
      name, avatar, whatsapp, bio,  
      subject, cost, 
      schedule
    } = request.body;
  
    //  Ultizando transection para tratamento de erro de inserção, se acasso alguma tabela não iserir os dados coretamente
    const trx = await db.transaction();
    
    try {
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
  
      //  vai fazer as alteraçães no banco de dados
      await trx.commit();
  
      return response.status(201).send();
    } catch (err) {
      await trx.rollback();
  
      return response.status(400).json({
        error: 'Unexpect error while creating new class'
      })
    }
  }
}