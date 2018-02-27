
module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    questionId: {
      unique: true,
      type: DataTypes.INTEGER,
    },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    options: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return questions;
};
