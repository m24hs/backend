const Iugu = require('../services/Iugu');

module.exports = {
    async store(req, res) {
        var type = req.params.type;

        // Variáveis auxiliares
        const user = "F9EE851CC99F458DAF059821266B0CFD";
        const plan = "mensal";
        //512464DE048B4658A25F2C7D57215287

        if (type === "credit-card") {
            // Cria token de pagamento
            const responsePaymentToken = await Iugu.createPaymentToken();        
            
            // Cria forma de pagamento
            const token = responsePaymentToken.id;
            const description = responsePaymentToken.extra_info.display_number;
            const responsePaymentMethod = await Iugu.createPaymentMethod({ user, token, description });
        }

        // Cria assinatura
        const payable_with = type === "credit-card" ? "credit_card " : "bank_slip";
        const responseSubscription = await Iugu.createSubscription({ user, plan, payable_with });
        const url = responseSubscription.recent_invoices[0].secure_url;

        console.log(url);
        res.json(responseSubscription);
    }
};