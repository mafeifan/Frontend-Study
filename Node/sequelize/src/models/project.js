/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/7/29
 * Time: 上午9:08
 */
module.exports = (sequelize, DataType) => {
  const Project = sequelize.define('Project', {
      id: {
        type         : DataType.INTEGER,
        primaryKey   : true,
        autoIncrement: true
      },
      name  : DataType.STRING,
      userId: DataType.INTEGER
  });

  return Project;
};
