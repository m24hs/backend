const Iugu = require('../services/Iugu');

module.exports = {
    async store(req, res) {       
        // Variáveis auxiliares
        const { user, type } = req.params;
        const plan = "mensal";

        if (type === "credit-card") {
            // Cria token de pagamento
            const responsePaymentToken = await Iugu.createPaymentToken();        
            
            // Cria forma de pagamento
            const token = responsePaymentToken.id;
            const description = responsePaymentToken.extra_info.display_number;
            const responsePaymentMethod = await Iugu.createPaymentMethod({ user, token, description });
        }

        // Cria assinatura
        const payable_with = type === "credit-card" ? "credit_card" : "bank_slip";
        const responseSubscription = await Iugu.createSubscription({ user, plan, payable_with });

        res.json({ status: "success",data: responseSubscription});
    }
};