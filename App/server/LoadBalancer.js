
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
  console.log(method);
  let content = Object.assign({}, req.body.content);
  //let result = null
  let path = req.body.path;
  console.log('root folder hitted');
  switch (method) {
    case 'POST':
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
      .then(response => {
        console.log(response);
        res.send(response)
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
