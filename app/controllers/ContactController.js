// Auxiliares
const Mail = require("../services/EmailService");
const { formatResponseOk } = require("../helpers");

module.exports = {
  async store(req, res) {
    // Variáveis
    const { name, email, phone, message } = req.body;

    // Email
    let html = "";
    html += `Nome completo: ${name}<br>`;
    html += `Email: ${email}<br>`;
    html += `Telefone: ${phone}<br>`;
    html += `Mensagem: ${message}<br>`;

    // Envia
    const response = await Mail.send({ title: "Novo contato no site", content: html });
    res.json(formatResponseOk(response));
  },
};
