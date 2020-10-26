// Models
const { Settings } = require("../models");

// Auxiliares
const axios = require("axios").default;
const { generateUrlName } = require("../helpers");

module.exports = {
  // Cria usuários
  async createCustomers(params) {
    return post("https://api.iugu.com/v1/customers", params);
  },
  // Cria tipo de pagamento
  async createPaymentToken(params) {
    const { iugu_account_id, iugu_test } = await iuguData();
    const {
      number,
      verification_value,
      first_name,
      last_name,
      month,
      year,
    } = params;
    return post("https://api.iugu.com/v1/payment_token", {
      data: {
        number,
        verification_value,
        first_name,
        last_name,
        month,
        year,
      },
      account_id: iugu_account_id,
      method: "credit_card",
      test: iugu_test,
    });
  },
  // Cria método de pagamento para o usuário
  async createPaymentMethod(params) {
    const { user, token, description } = params;
    return post(`https://api.iugu.com/v1/customers/${user}/payment_methods`, {
      token,
      description,
      set_as_default: true,
    });
  },
  // Cria plano de assinatura
  async createPlan(params) {
    const { name, price } = params;
    const identifier = generateUrlName(name);

    const plan = await get(
      `https://api.iugu.com/v1/plans/identifier/${identifier}`
    );

    let response = {};
    if (plan.hasOwnProperty("id")) {
      response = await put(`https://api.iugu.com/v1/plans/${plan.id}`, {
        value_cents: price * 100,
      });
    } else {
      response = await post("https://api.iugu.com/v1/plans", {
        name: "Assinatura - " + name + " - " + price.replace(".", ","),
        identifier: identifier,
        interval: 1,
        interval_type: "months",
        value_cents: price * 100,
      });
    }
    return response;
  },
  // Cria Assinatura
  async createSubscription(params) {
    const { user, plan, payable_with } = params;
    return post("https://api.iugu.com/v1/subscriptions", {
      two_step: false,
      suspend_on_invoice_expired: false,
      only_charge_on_due_date: false,
      customer_id: user,
      only_on_charge_success: payable_with === "credit_card" ? true : false,
      payable_with,
      plan_identifier: plan,
    });
  },
};

const post = async (url, json) => {
  const { iugu_token } = await iuguData();
  return axios
    .post(url, json, {
      auth: {
        username: iugu_token,
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

const put = async (url, json) => {
  const { iugu_token } = await iuguData();
  return axios
    .put(url, json, {
      auth: {
        username: iugu_token,
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

const get = async (url, params) => {
  const { iugu_token } = await iuguData();
  return axios
    .get(url, {
      params: { api_token: iugu_token },
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

// Dados da IUGU
const iuguData = async () => {
  // Busca configurações
  const settings = await Settings.findOne();

  // Verifica se tá tudo certo
  if (settings) {
    // Variáveis
    const {
      iugu_token,
      iugu_token_production,
      iugu_account_id,
      iugu_test,
    } = settings;
    return {
      iugu_token: iugu_test === false ? iugu_token_production : iugu_token,
      iugu_account_id,
      iugu_test,
    };
  } else {
    return { iugu_token: "", iugu_account_id: "", iugu_test: true };
  }
};
