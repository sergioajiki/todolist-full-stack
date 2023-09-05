import nodemailer from 'nodemailer';
import { PayloadSendMail } from '../interfaces/PayloadSendMail';
import 'dotenv/config';

const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.USER_MAILTRAP,
      pass: process.env.PASS_MAILTRAP
    },
  });

  const ADMINEMAIL = 'adminEmail@teste.com';
  
  const sendEmail = async ({ email, username, activationUrl}
    : PayloadSendMail): Promise<void> => {
    const emailInfo = {
      from: ADMINEMAIL,
      to: email,
      subject: 'email de teste',
      html: `<h1>Bem-vindo ${username}, clique no link para ativar o cadastro</h1><br>
      <h4>
      <a href="${activationUrl}" title="link para ativação">
      <h4>Clique aqui para ativação da conta</h4>
      </a>
      </h4>`
    };

    const emailSent = await transport.sendMail(emailInfo);
    console.log('email foi enviado para', emailSent.accepted[0]);
  };

  export default {
    sendEmail,
  }