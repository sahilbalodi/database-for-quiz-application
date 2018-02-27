
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name:{
      unique: true,
      type: DataTypes.STRING,
    },
    score: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return users;
};
