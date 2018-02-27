
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('questions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    questionId: {
      allowNull: false,
      unique: true,
      type: Sequelize.INTEGER,
    },
    question: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    answer: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    options: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('questions'),
};
