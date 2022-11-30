const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId' });
      this.hasMany(models.Like, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    passwordAgain: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
