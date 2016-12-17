# HTTP Server

### About
This project is a simple HTTP server build in node using the HTTP module. There is a vanilla body parser.

This was built as part of the Code Fellows 401 JavaScript class.

### To Get The Server Running
```js
$ cd lab-megan
$ npm i
```
Open two terminals. In the first enter:
```js
$ node server.js
```
The second terminal will take requests:

### To Make Requests
- `http localhost:8000 text==<"query text here">` Will return a message from the server.
- `http POST localhost:8000 text=<"your message text">` Will return a message from the server.
- `http localhost:8000/cowsay text==<"query text here">` Will return a message from the cow.
- `http POST localhost:8000/cowsay text=<"your message text">` Will return a message from the cow.

Note: if the server is running on a different port than 8000 please use that port number in the commands above instead of the port number shown.

### To Use This API In Your Own Project
```js
$ cd lab-megan
$ npm i
$ brew install httpie
$ npm install -S cowsay
```
