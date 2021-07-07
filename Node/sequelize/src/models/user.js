/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/7/29
 * Time: 上午9:08
 */
module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
      id: {
        type         : DataType.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
        notNull      : true
      },
      name : DataType.STRING,
      email: DataType.STRING
  });

  User.associate = function(models) {
    models.User.hasOne(models.Project, { foreignKey: 'userId', sourceKey: 'id' });
    // 别名, 覆盖默认的模型名 Project
    models.User.hasOne(models.Project, { as:'ProjectRef', foreignKey: 'userId', sourceKey: 'id' });
    models.User.hasMany(models.Post, { as:'PostRef', foreignKey: 'userId'});
  };
  return User;
};
