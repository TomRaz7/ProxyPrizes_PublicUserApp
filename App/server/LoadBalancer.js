
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
  let content = Object.assign({}, req.body.content);
  let result = null
  console.log('root folder hitted');
  console.log(req.body);
  switch (client) {
    case 'publicApp':
      fetch('http://192.168.0.36:4000/testLoadBalancer',{
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
      });
      break;
    default:

  }
})
