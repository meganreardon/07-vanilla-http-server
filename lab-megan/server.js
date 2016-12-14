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
  // console.log('The req url is:', req.url);
  // console.log('The req querystring is:', req.url.query);
  // console.log('Request methods are:', req.methods);

  if (req.method === 'GET' && req.url.pathname !== '/cowsay') {
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.write('Hello from my server. This is coming from the GET method.\n\n');
    res.end();
  }

  if (req.method === 'POST' && req.url.pathname !== '/cowsay') {
    parseBody(req, function(err) {
      if (err) console.error(err);
      console.log('POST request body is:', req.body);
    });
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.write('Hello from my server. This is coming from the POST method.\n\n');
    res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    // note: text on query on request object - bang method
    console.log('The request querystring is:', req.url.query);
    var currentRequest = req.url.query;
    if (req.url.query.text === undefined) {
      res.writeHead(400, {'Content-Type': 'text/plain' });
      res.write(cowsay.say({text: 'bad request'}));
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain' });
      res.write(cowsay.say(currentRequest));
    }
    res.end();
  }



  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    // res.write(cowsay.say({text: 'Moooooooore popcorn.'})); // orig

    var testBody;

    parseBody(req, function(err, data) { // use the data here will be body
      if (err) console.error(err);
      // console.log('POST request body is:', req.body);
      testBody = data;
      console.log('testBody inside block is: ', testBody);
      // return(null, testBody); dont need this
    });

    // need to get callback from parseBody to use as our text TODO

    console.log('testBody test outside block is: ', testBody);


    // old
    // var aCurrentRequest = req.url.query;
    // if (req.url.query.text === undefined) { //req.body
    //   res.writeHead(400, {'Content-Type': 'text/plain' });
    //   res.write(cowsay.say({text: 'bad request'}));
    // } else {
    //   res.writeHead(200, {'Content-Type': 'text/plain' });
    //   res.write(cowsay.say(aCurrentRequest));
    // }

    // TODO reutrn to this with variable, rename it
    var aCurrentRequest = req.body.text; // NOPE undefined as of this time
    console.log('aCurrentRequest var is: ', aCurrentRequest); //nope

    if (aCurrentRequest) {
      console.log('You have reached the YEP section. Request Body Text is: ', aCurrentRequest);
      res.writeHead(200, {'Content-Type': 'text/plain' });
      res.write(cowsay.say(aCurrentRequest));
    } else {
      console.log('You have reached the NOPE section.');
      res.writeHead(400, {'Content-Type': 'text/plain' });
      res.write(cowsay.say({text: 'bad request'}));
    }


    res.end();
  }



  if (req.method === 'GET' && req.url.pathname === '/dragon') {
    // if dragon f: dragon // hint from from other student
  }

  res.end();
});

server.listen(PORT, () => {
  console.log('Server up at port:', PORT);
});
