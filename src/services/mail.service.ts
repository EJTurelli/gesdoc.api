import nodemailer from 'nodemailer';
import { IUser, IUserData } from '../interfaces/user.interface';

export enum MailType {
  welcome = 'welcome',
  resetKey = 'resetKey',
};

export const sendMail = (type: string, user: IUserData | IUser, hash: string) => {

  const senderMail = process.env.MX_USER;
  const receiveMail = `${user.name} ${user.surname}<${user.email}>`;
  const url = process.env.WEB_URL+"/"+hash;
  var subject = '';
  var html = '';

  // async () => {
  //   let testAccount = await nodemailer.createTestAccount();
  // }

  const emailTransporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: senderMail,
      pass: process.env.MX_PASSWORD //'mlhfldultgmunuoa'
    },
    debug: false,
    logger: true  
  });

  if (type === MailType.welcome) {
    subject = `Bienvenido al sistema de gestión de archivos de la Municipalidad`;
    html = `<html><body>Hola ${user.name} ${user.surname}, 
              <p>Este correo inicia el proceso de bienvenida al sistema de gestión de archivos de la Municipalidad 
              <p>En el siguiente link podrás gestionar tu clave de acceso:<br>
              <ul>
                <li><a href='${url}'>${url}</a></li>
              </ul> 
              <p>Gracias
            </body></html>`
  }
  else {
    subject = `Reinicio de clave del sistema de gestión de archivos de la Municipalidad`;
    html = `<html><body>Hola ${user.name} ${user.surname}, 
              <p>En el siguiente link podrás reiniciar tu clave de acceso:<br>
              <ul>
                <li><a href='${url}'>${url}</a></li>
              </ul> 
              <p>Gracias
            </body></html>`
  }

  emailTransporter.sendMail(
    {
      from: senderMail,
      to: receiveMail,
      subject,
      html
    } , function(error: any, info: { response: any; }) {
    if (error) {
      throw error;
    } else {
      console.log(info.response);
    }
  });

}