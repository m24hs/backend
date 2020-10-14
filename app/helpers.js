module.exports = {
  formatResponseSequelize: async (request) => {
    try {
      const post = await request;
      return {
        status: "success",
        data: post.dataValues,
      };
    } catch (error) {
      return {
        status: "error",
        data: error.message,
      };
    }
  },
  formatResponseOk: (response) => {
    return { status: "success", data: response };
  },
  formatResponseError: (response) => {
    return { status: "error", data: response };
  },
  generateUrlName: (str) => {
    const original =
      "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    const replace =
      "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let newStr = "";
    for (i = 0; i < str.length; i++) {
      let change = false;
      for (a = 0; a < original.length; a++) {
        if (str.substr(i, 1) == original.substr(a, 1)) {
          newStr += replace.substr(a, 1);
          change = true;
          break;
        }
      }
      if ((change == false)) {
        newStr += str.substr(i, 1);
      }
    }
    newStr = newStr.replace(/ /g,"-").toLowerCase();
    return newStr;
  },
};
