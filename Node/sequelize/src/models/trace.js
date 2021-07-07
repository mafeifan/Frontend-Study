/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/7/29
 * Time: 上午9:08
 */
module.exports = (sequelize, DataType) => {
  const Trace = sequelize.define('Trace', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    hex: DataType.STRING,
    json: DataType.STRING,
  });

  return Trace;
};
