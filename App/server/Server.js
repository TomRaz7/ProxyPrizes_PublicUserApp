var express = require('express');
var mysql = require('mysql');
require('dotenv').config(); //to read env variables defined in the .env

//Config
const port = process.env.SERVER_PORT;

const server =  express();

server.listen(port, ()=>{
  console.log(`Server listening on port : ${port}`);
})
