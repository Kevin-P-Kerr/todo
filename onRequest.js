var fs = require('fs');
var CARDDIR = './cards/';
var url = require('url');

var save = function (r) {
  var cards = r.query.cards;
  var name = r.query.view;
  fs.writeFileSync(CARDDIR+name,cards);
};

var getCards = function (pn) {
  var n = pn.split("/stacks/")[1];
  try {
    var cards = fs.readFileSync(CARDDIR+n).toString();
  }
  catch (e) {
    cards = "[]";
  }
  return cards;
  //return "readCards("+cards+");";
};

var createView = function () {
  var template = fs.readFileSync('./index.html').toString();
  return template;
};

var createJS = function (cards) {
  var jsTemplate = fs.readFileSync('./todo.js').toString();
  return jsTemplate;
};

var getCSS = function () {
  var cssTemplate = fs.readFileSync('./todo.css').toString();
  return cssTemplate;
};


var onRequest = function (req,res) {
  var rurl = url.parse(req.url,true);
  console.log(rurl.pathname);
  var cards;
  if (rurl.pathname === '/save') {
    save(rurl);
    res.end('ok');
  }
  else if (rurl.pathname.match('/stacks')) {
    cards = getCards(rurl.pathname);
    res.writeHead(200,{"Content-type":"text/javascript"});
    res.end(cards);
  }
  else if (rurl.pathname === "/") {
    res.end(createView());
  }
  else if (rurl.pathname === "/todo.js") {
    res.writeHead(200,{"Content-type":"text/javascript"});
    res.end(createJS());
  }
  else if (rurl.pathname === "/todo.css") {
    res.writeHead(200,{"Content-type":"text/javascript"});
    res.end(getCSS());
  }
};

module.exports = onRequest;
