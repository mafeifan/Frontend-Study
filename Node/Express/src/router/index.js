module.exports = function(app) {

  // 设置留言的全局变量
  let posts = [];
  app.locals.posts = posts;


	app.get('/', function(request, response) {
    response.render('index', {
        message: 'Hey everyone! This is my webpage.'
    });
	});


  app.get('/post', function(request, response) {
    response.render('post/create');
  });

  app.post('/post', function(request, response) {
    // 如果用户提交的表单没有标题或者内容，则返回一个 400 的错误
    if (!request.body.title || !request.body.body) {
        response.status(400).send('Entries must have a title and a body.');
        return;
    }
    // 添加到 posts 中
    posts.push({
        title: request.body.title,
        body: request.body.body,
        published: new Date()
    });
    // 重定向到主页来查看你的新条目
    response.redirect('/');
  });
}

