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

  // these two lines were commented out in class code but I used them in my lab work
  // would like to keep for future reference
  // console.log('The req url is:', req.url);
  // console.log('The req querystring is:', req.url.query);
  // console.log('Request methods are:', req.methods);

// -----------------------------
//    handle non-cowsay requests
// -----------------------------

  if (req.method === 'GET' && req.url.pathname !== '/cowsay' && req.url.pathname !== '/dragon') {
    // console.log('\n\n ::: GET request is:', req.url.pathname);
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.write('Hello from my server. This is coming from the GET method.\n\n');
    res.end();
  }

  if (req.method === 'POST' && req.url.pathname !== '/cowsay') {
    parseBody(req, function(err) {
      if (err) console.error(err);
      // console.log('\n\n ::: POST request body is:', req.body);
    });
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.write('Hello from my server. This is coming from the POST method.\n\n');
    res.end();
  }

  // -------------------------
  //    handle cowsay requests
  // -------------------------

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    // console.log('\n\n ::: The GET request querystring for COWSAY is:', req.url.query);
    var currentRequest = req.url.query;
    if (!req.url.query.text) {
      res.writeHead(400, {'Content-Type': 'text/plain' });
      res.write(cowsay.say({text: 'bad request'}));
    } else {
      res.write(cowsay.say(currentRequest));
      res.writeHead(200, {'Content-Type': 'text/plain' });
    }
    res.end();
  }

  // orig
  // if(req.method === 'POST' && req.url.pathname === '/cowsay') {
  //   parseBody(req, function(err, data) {
  //     if (err) console.error(err);
  //     // console.log('\n\n ::: Cowsay POST\n ::: The DATA inside block is: ', data, '\n\n');
  //     if (data) {
  //       // console.log(' ::: You have reached the YEP section.\n ::: Request Body Text is: ', data, '\n\n');
  //       res.writeHead(200, {'Content-Type': 'text/plain' });
  //       res.write(cowsay.say(data));
  //       res.end();
  //     } else {
  //       // console.log('You have reached the NOPE section.\n\n');
  //       res.writeHead(400, {'Content-Type': 'text/plain' });
  //       res.write(cowsay.say({text: 'bad request'}));
  //     }
  //   });
  //
  // //try #2
  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err, data) {
      if (err) {
        console.error(err);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request'}));
        console.log('COWSAY POST in err top area');
        // console.log('\n\n ::: Cowsay POST\n ::: The DATA inside block is: ', data, '\n\n');
      } else {
        // console.log(' ::: You have reached the YEP section.\n ::: Request Body Text is: ', data, '\n\n');
        res.writeHead(200, {'Content-Type': 'text/plain' });
        res.write(cowsay.say(data));
      }
      res.end();
      // } else {
      //   // console.log('You have reached the NOPE section.\n\n');
      // }
    });
  }


    // if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    //   parseBody(req, function(err) {
    //     if (err) {
    //       console.error(err);
    //       res.writeHead(400, {'Content-Type': 'text/plain'});
    //       res.write(cowsay.say({text: 'bad request'}));
    //     // console.log('\n\n ::: POST request body is:', req.body);
    //   } else {
    //     res.writeHead(200, {'Content-Type': 'text/plain' });
    //     res.write('Hello from my server. This is coming from the POST method.\n\n');
    //     res.end();
    //   }
    // }

  // --------------------------------
  //    attempt at getting the dragon
  // --------------------------------

  // if (req.method === 'GET' && req.url.pathname === '/dragon') {
  //   // cowsay -f tux "This is my text."
  //   var dragonRequest = req.url.query;
  //   if (req.url.query.text) {
  //     console.log('\n\n ::: HERE BE DRAGONS ::: \n\n');
  //     res.writeHead(200, {'Content-Type': 'text/plain' });
  //     // res.write(cowsay.say({f:dragon}, {'text: dragonRequest'}));
  //     res.write(cowsay.say({f:dragon}, {text:dragonRequest}));
  //   } else {
  //     res.writeHead(400, {'Content-Type': 'text/plain' });
  //     res.write(cowsay.say({text: 'bad request'}));
  //   }
  //   res.end();
  // }

});

server.listen(PORT, () => {
  console.log('Server up at port:', PORT);
});
