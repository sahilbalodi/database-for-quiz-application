
module.exports = (sequelize, DataTypes) => {
  const userresponse = sequelize.define('userresponse', {
    name:{
      primaryKey: true,
      type: DataTypes.STRING,
    },
    questionId:{
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
  userresponse.removeAttribute('id');
  return userresponse;
};
