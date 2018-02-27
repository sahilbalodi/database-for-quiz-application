
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userresponses', {
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
  }).then(() => queryInterface.sequelize.query('ALTER TABLE "userresponses" ADD CONSTRAINT "responses" PRIMARY KEY ("name", "questionId")')),

  down: queryInterface => queryInterface.dropTable('userresponses'),
};
