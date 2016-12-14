# HTTP Server

## About
This project is a simple HTTP server build in node using the HTTP module. There is a vanilla body parser.

## To Get The Server Running
```js
$ cd lab-megan
$ npm i
$ brew install httpie
$ npm install -S cowsay
```
Open two terminals. In the first enter:
```js
$ node server.js
```
The second terminal will take requests.

## To Make Requests
- `http localhost:8000 text==<query>` Will return a message from the server.
- `http POST localhost:8000 text=<post>` Will return a message from the server.
- `http localhost:8000/cowsay text==<query>` Will return a message from the cow.
- `http POST localhost:8000/cowsay text=<post>` Will return a message from the cow.
