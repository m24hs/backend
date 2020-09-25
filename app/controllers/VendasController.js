const Iugu = require('../services/Iugu');

module.exports = {
    async iugu(req, res) {
        const response = await Iugu.createToken();
        res.json(response);
    }
};