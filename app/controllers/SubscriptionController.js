const Iugu = require('../services/Iugu');

module.exports = {
    async store(req, res) {
        const response = await Iugu.createPaymentMethod();
        res.json(response);
    }
};