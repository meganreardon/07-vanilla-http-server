'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  // tese two lines were commented out in class code but I used them in my lab work
  console.log('The req url is:', req.url);
  console.log('The req querystring is:', req.url.query);

  console.log('Request methods are:', req.methods);

  // this was commented out in class code
  if (req.method === 'GET') {
    console.log('You have made a request');
  }

  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) console.error(err);
      console.log('POST request body is:', req.body);
    });
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
