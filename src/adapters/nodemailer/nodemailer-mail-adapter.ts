import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;
const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Diego Fernandes <diego.schell.f@gmail.com>",
      subject,
      html: body
    });
  }
}