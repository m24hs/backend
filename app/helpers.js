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
        error: error.message,
      };
    }
  },
  formatResponseError: (response) => {
    return { status: "error", data: response };
  },
};
