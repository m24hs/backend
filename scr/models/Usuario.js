const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
    },
    celular: {
        type: String,
        required: true,
    },
    rg: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
    },
    endereço: {
        type: String,
        required: true,
    },
    complemento: {
        type: String,
    },
    municipio: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model('Usuario', UsuarioSchema);