
module.exports = (sequelize, DataTypes) => {
  const userresponses = sequelize.define('userresponses', {
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    questionId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    response: DataTypes.STRING,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  userresponses.removeAttribute('id');
  return userresponses;
};
