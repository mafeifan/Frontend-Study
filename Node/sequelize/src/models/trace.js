/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/7/29
 * Time: 上午9:08
 */
module.exports = (sequelize, DataType) => {
  const Trace = sequelize.define('Trace', {
      id: {
        type         : DataType.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
        notNull      : true
      },
      data : DataType.STRING,
  });

  return Trace;
};
