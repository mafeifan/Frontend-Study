var path = require("path");

module.exports = function(app) {
	// 告诉 Express 你的视图存在于一个名为 views 的文件夹中
	app.set("views", path.resolve(__dirname, "../views"));
	// 告诉 Express 你将使用EJS模板引擎
	app.set("view engine", "ejs");
}