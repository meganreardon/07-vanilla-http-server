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

    // if (currentRequest === null) { // no
    if (req.url.query.text === undefined) {
      res.writeHead(400, {'Content-Type': 'text/plain' });
      res.write(cowsay.say({text: 'bad request'}));
      //write head
      //message
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain' });
      res.write(cowsay.say(currentRequest));
    }

    res.end();

    // if the body does not equal text=message
      // return status code 400
      // body including value from query
      // and a body including the value returned from cowsay.say({ text: 'bad request' })
    // else return
      // status code of 200
      // a response body that includes the value returned from cowsay.say({ text: <querystring text> })

    //NEW TRY
    //grab the body
    // if it has == change to =

    // if the query is text=message respond with
      // status code of 200
      // response body that includes the value returned from cowsay.say({ text: <querystring text> })
    // if the text is not there respond with
      // status code 400
      // a body including the value returned from cowsay.say({ text: 'bad request' })

  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    res.write(cowsay.say({text: 'Moooooooore popcorn.'}));
    parseBody(req, function(err) {
      if (err) console.error(err);
      console.log('POST request body is:', req.body);
    });
    // res.end(); // this was here in class code, might need to put it back
    // TODO ask ta why only get get cowsay is throwing errors
    res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/dragon') {
    // if dragon f: dragon // hint from from other student
  }

  res.end();
  // TODO ask ta if we want res.end for each if statement above
});

server.listen(PORT, () => {
  console.log('Server up at port:', PORT);
});
