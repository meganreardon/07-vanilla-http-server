'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

// code from docs
// const server = http.createServer((req,res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('X-Foo', 'bar');
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('ok');
// });


const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  // tese two lines were commented out in class code but I used them in my lab work
  // console.log('The req url is:', req.url);
  // console.log('The req querystring is:', req.url.query);
  //
  // console.log('Request methods are:', req.methods);

  // this was commented out in class code
  if (req.method === 'GET') {
    // var body = 'Hello from my server.'; // keep for ta question
    res.writeHead(200, {
      // 'Content-Length': Buffer.byteLength(body), // keep for ta question
      'Content-Type': 'text/plain' });
    res.write('Hello from my server. This is coming from the GET method.');
    // TODO: ask ta if message should come from header body, so confuse.
    // TODO: ask ta if this should also be in req.method POST below, lab work said for all requests
    // res.end();
  }

  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) console.error(err);
      console.log('POST request body is:', req.body);
    });
    // res.writeHead(200, {
    //   // 'Content-Length': Buffer.byteLength(body), // keep for ta question
    //   'Content-Type': 'text/plain' });
    // res.write('Hello from my server. This is coming from the POST method.');
    // res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    res.write(cowsay.say({text: 'Moooooooore popcorn.'}));
    res.end();
  }
  res.end();
});

server.listen(PORT, () => {
  console.log('Server up at port:', PORT);
});
