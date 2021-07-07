/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/7/29
 * Time: 上午9:28
 */

const models = require('./models/index');

const UserModel = models.User;

UserModel.findOne( { include: 'Project' })
  .then(res => console.log(res.Project.name))


UserModel.findOne( { include: 'ProjectRef' })
  .then(res => console.log(res.ProjectRef.name))


UserModel.findAll( {include: 'PostRef'} )
.then(res => {
  res.forEach((item) => {
    console.log(item.PostRef[0].title)
  })
})
