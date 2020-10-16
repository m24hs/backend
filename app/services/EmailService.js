// Models
const { Settings } = require("../models");

// Node mailer
const nodemailer = require("nodemailer");

module.exports = {
  async send(params) {
    // Dados
    const { title, content } = params;

    let result = {};
    // Busca no db
    try {
      const settings = await Settings.findOne();

      // Verifica se tá tudo certo
      if (!settings) {
        throw new Error("Email não configurado!");
      }

      // Variáveis
      const { name, email, email_pass, email_server, email_port } = settings;

      // Dados de conexão
      let transporter = nodemailer.createTransport({
        host: email_server,
        port: email_port || null,
        secure: false,
        auth: {
          user: email,
          pass: email_pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Trata conteudo HTML

      // Opções do email
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: `${email}`,
        subject: title,
        html: content,
      };

      // Envia
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new Error(info);
        } else {
          console.log(`Email enviado para: ${email}`);
        }
      });
      // Error
    } catch (e) {
      result.error = e.message;
      // Return
    } finally {
      return result;
    }
  },
};
