const http = require('http');

http.createServer(function(req,res) {

	res.write(`It's Sunday February 25th. 7:11 am and about to go to church and pray for a new job in the bay area.
	            "4 days after Tiff's Birthday (My beloved cousin) On the way to becoming a full stack engineer!`);
	res.end();

}
).listen(3000);

console.log("Server started on port 3000");


