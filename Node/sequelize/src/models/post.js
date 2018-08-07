/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/7/29
 * Time: 上午9:08
 */
module.exports = (sequelize, DataType) => {
  const Post = sequelize.define('Post', {
      id: {
        type         : DataType.INTEGER,
        primaryKey   : true,
        autoIncrement: true
      },
      userId  : DataType.INTEGER,
      title  : DataType.STRING,
      content: DataType.STRING
  });

  return Post;
};
