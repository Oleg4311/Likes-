const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      Like.belongsTo(User, { foreignKey: 'userId' });
      Like.belongsTo(Post, { foreignKey: 'postId' });
    }
  }
  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
