const http = require('http');

http.createServer(function(req,res) {

	res.write("It's monday, President's day. February 19th On the way to becoming a full stack engineer!");
	res.end();

}
).listen(3000);

console.log("Server started on port 3000");


