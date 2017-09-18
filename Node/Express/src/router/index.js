module.exports = function(app) {
	app.get("/", function(request, response) {
	    response.render("index", {
	        message: "Hey everyone! This is my webpage."
	    });
	}); 
}

