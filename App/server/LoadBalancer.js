var express = require('express');
require('dotenv').config(); //to read env variables defined in the .env
var bodyParser = require('body-parser');
const fetch = require('node-fetch');


//Config
const port = process.env.LOADBALANCER_PORT;

const loadBalancer = express();

loadBalancer.use(bodyParser.json({type:'application/json'}));
loadBalancer.use(bodyParser.urlencoded({extended:true}));

loadBalancer.listen(port, () =>{
  console.log(`LoadBalancer listening on port : ${port}`);
});



loadBalancer.post('/root', function(req, res){
  let client = req.body.client;
  let method = req.body.forwardedRequestMethod;
  let content = Object.assign({}, req.body.content);
  let path = req.body.path;
  console.log('root folder hitted');
  switch (method) {
    case 'POST':
      console.log("La requête post va être forwardé");
      fetch(path,{
        method:'POST',
        body:JSON.stringify({
          content
        }),
        headers:{
               Accept: 'application/json',
               'content-type':'application/json'
             }
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        result = Object.assign({}, responseJson);
        res.send(result);
      })
      break;
    case 'GET':
      fetch(path)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        result = Object.assign({}, responseJson);
        res.send(result);
      })
    default:
  }
})




//
// var express = require('express');
// require('dotenv').config(); //to read env variables defined in the .env
// const fetch = require('node-fetch');
// const request = require('request');
// const intoStream = require('into-stream');
//
// //Config
// const port = process.env.LOADBALANCER_PORT;
//
// const loadBalancer = express();
// var bodyParser = require('body-parser');
//
//
// var textParser = bodyParser.json({type:'application/json'});
//
// var postRouteHandler = function(req, res) {
//   console.log(req.body);
//   let path = req.body.path;
//   let text = Object.values(req.body);
//   // if (! shouldPipe(text)) {
//   //   return res.sendStatus(400); // or whatever
//   // }
//
//   // Here's where the magic happens: create a new stream from `text`,
//   // and copy the properties from `req` that `request` needs to pass
//   // along the request to the destination.
//   let stream = intoStream(text.toString());
//   stream.body = req.body;
//   stream.method  = req.method;
//   stream.headers = req.headers;
//   console.log(stream);
//   console.log("Request pipé à");
//   console.log(path);
//   console.log(fetch(path));
//   stream.pipe(fetch(path)).pipe(res);
// };
//
// loadBalancer.use('/root', [textParser, postRouteHandler]);
//
// loadBalancer.listen(port, () =>{
//   console.log(`LoadBalancer listening on port : ${port}`);
// });
//



// loadBalancer.post('/root', function(req, res, next){
//   console.log("hitted");
//   console.log(req.body.path);
//   let path = req.body.path;
//   let text = Object.values(req.body);
//   console.log(text);
//   let stream = intoStream(text.toString());
//   stream.method  = req.method;
//   stream.headers = req.headers;
//   console.log("Request pipé à");
//   console.log(path);
//   stream.pipe(request(path)).pipe(res);
// })


// loadBalancer.post('/root', function(req, res){
//   let method = req.body.forwardedRequestMethod;
//   let path = req.body.path;
//   console.log(path);
//   console.log('root folder hitted');
//   switch (method) {
//     case 'POST':
//       console.log('Post du loadbalancer');
//       req.pipe(request(path)).pipe(res)
//       break;
//     case 'GET':
//     console.log('Get du loadbalancer');
//     req.pipe(request(path)).pipe(res)
//     default:
//   }
// })
