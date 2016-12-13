![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 07: Cowsay API
===

## To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-brian`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Include
  * `.gitignore`
  * `.eslintrc`
  * `package.json`
  * `gulpfile.js`
  * `README.md`

## Description
* Create an HTTP Server using the NodeJS `http` module
* Create a *custom* body parsing module that is used for parsing the body of all **POST** requests
* For all requests made to `/`, the server should respond with the following:
  * a header containing `Content-Type: text/plain`
  * a status code of **200**
  * a response with the string "hello from my server!"
* For all **GET** requests made to `/cowsay`, the server should respond with the following:
  * the query string should have the key value `text=<message>`
  * the response header should include `Content-Type: text/plain`
  * if the query `text=messsage` is set, respond with:
    * a status code of 200
    * a response body that includes the value returned from `cowsay.say({ text: <querystring text> })`
  * if the query `text=message` is **not** set, respond with:
    * status code = 400
    * a body including the value returned from `cowsay.say({ text: 'bad request' })`
* For all **POST** requests made to `/cowsay`, the server should respond with the following:
  * the response header should include `Content-Type: text/plain`
  * if the JSON `{text: messsage}` is set in the body, respond with:
    * a status code of 200
    * a response body including the value returned from `cowsay.say({ text: <querystring text> })`
  * if the JSON `{text: messsage}` is **not** set in the body, respond with:
      * a status code of 400
      * a body including the value returned from `cowsay.say({ text: 'bad request' })`

## Bonus
* **2pts:** add the ability to change the cowfile - **ex: dragon, sheep, etc** _(note: this should be done through the querystring)_
