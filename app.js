const http = require('http');

http.createServer(function(req,res) {

	res.write("It's Saturday, My birthday, February 24th. 4 days after Tiff's Birthday (My beloved cousin) On the way to becoming a full stack engineer!");
	res.end();

}
).listen(3000);

console.log("Server started on port 3000");


