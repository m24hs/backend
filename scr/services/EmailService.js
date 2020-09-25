// Models
const Mail = require('../models/Email');

// Node mailer
const nodemailer = require('nodemailer');

module.exports = {
    async send(params) {
        // Dados 
        const { userData: user, courseData: course, type } = params;
        
        let result = {};
        // Busca no db
            try {
                // Tipo email
                let _id = null;
                if (type === 'approved') {
                    _id = process.env.EMAIL_APPROVED;
                } else if (type === 'waitlist') {
                    _id = process.env.EMAIL_WAITLIST;
                }
                // Se nenhum configurado, sai da rotina
                if ( _id === null ) {
                    throw { message: 'Email não configurado!' }; 
                }
                // Dados do email
                const mail = await Mail.findOne({ _id });                
                if (!mail)
                    throw { message: 'Email não existe' }; 
                else if ((mail.html || '') === '') 
                    throw { message: 'Verifique o conteudo do email' }; 
                    
                // Dados de conexão
                let transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_SERVER,
                    port: process.env.EMAIL_PORT,
                    secure: false, 
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });
        
                // Trata conteudo HTML
                const variables = [...mail.html.matchAll(/\{(.*?)\}/g)];
                for (item in variables) {
                    mail.html = mail.html.replace(new RegExp(variables[item][0],'g'), eval(variables[item][1]));
                }    
        
                // Opções do email
                const mailOptions = {
                    from: `"Tirso Cursos e Treinamentos" <${process.env.EMAIL_USER}>`,
                    to: `${user.email}, ${process.env.EMAIL_USER}`,
                    subject: mail.title,
                    html: mail.html
                };
        
                // Envia
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error)
                        throw { message: info }; 
                    else
                        console.log(`Email enviado para: ${user.email} e ${process.env.EMAIL_USER}`);
                });        
        // Error
        } catch (e) {
            result.error = e.message;            
        // Return
        } finally {
            return result;
        }
    }
};