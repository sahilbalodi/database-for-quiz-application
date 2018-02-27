
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userresponse', {
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    questionId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    response: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }).then(() => queryInterface.sequelize.query('ALTER TABLE "userresponse" ADD CONSTRAINT "response" PRIMARY KEY ("name", "questionId")')),

  down: queryInterface => queryInterface.dropTable('userresponse'),
};
