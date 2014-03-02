var http = require('http');
var or = require('./onRequest');

http.createServer(or).listen(8000);
