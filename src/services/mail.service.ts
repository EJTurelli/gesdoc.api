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

  const emailTransporter = nodemailer.createTransport({
    host: process.env.MX_HOST,
    port: parseInt(process.env.MX_PORT),
    secure: true,
    debug: true,
    connectionTimeout: 10000,
    auth: {
      user: senderMail,
      pass: process.env.MX_PASSWORD //'mlhfldultgmunuoa'
    },
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
      console.log(error);
    }
  });

}