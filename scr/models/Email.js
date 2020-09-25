const { Schema, model } = require('mongoose');

const EmailSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = model('Email', EmailSchema);