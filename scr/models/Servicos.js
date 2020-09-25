const { Schema, model } = require('mongoose');

const ServicosSchema = new Schema({
    titulo: String,
    url: String,
    descricao: String,
    conteudo: String,
    preco: String,
    thumbnail: String
}, {
    timestamps: true,
});

module.exports = model('Service', ServicosSchema);