module.exports = {
  formatResponse: async (request) => {
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
};
