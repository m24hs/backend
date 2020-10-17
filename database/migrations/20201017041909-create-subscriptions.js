module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Subscriptions", "service", {
        type: DataTypes.INTEGER,
        references: {
          model: 'Services',
          key: 'id'
        }  
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Subscriptions", "service"),
    ]);
  },
};
