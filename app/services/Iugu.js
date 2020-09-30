const axios = require("axios").default;

module.exports = {
  async createCustomers(params) {
    return api("https://api.iugu.com/v1/customers", params);
  },
  async createPaymentToken(params) {
    return api("https://api.iugu.com/v1/payment_token", {
      data: {
        number: "4111111111111111",
        verification_value: "767",
        first_name: "MARCELO",
        last_name: "ROSSINI",
        month: "12",
        year: "2026",
      },
      account_id: "88DD0F7517A9F644071BFE787B0E5250",
      method: "credit_card",
      test: true,
    });
  },
  async createPaymentMethod(params) {
    const { user, token, description } = params;
    return api(`https://api.iugu.com/v1/customers/${user}/payment_methods`, {
      token,
      description,
      set_as_default: true,
    });
  },
  async createPlan(params) {
    return api("https://api.iugu.com/v1/plans", {
      name: 'mensal',
      identifier: 'mensal',
      interval: 1,
      interval_type: 'months',
      value_cents: 5000
    });
  },  
  async createSubscription(params) {
    const { user, plan, payable_with } = params;
    return api("https://api.iugu.com/v1/subscriptions", {
        two_step: false,
        suspend_on_invoice_expired: false,
        only_charge_on_due_date: false,
        customer_id: user,
        only_on_charge_success: false,
        payable_with,
        plan_identifier: plan
      });
  }
};

const api = (url, json) => {
  return axios
    .post(url, json, {
      auth: {
        username: "f9c20677ea63f0e068e03fcf1e050d6c",
        password: "",
      },
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};