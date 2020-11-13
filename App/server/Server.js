var express = require('express');
var mysql = require('mysql');
require('dotenv').config(); //to read env variables defined in the .env
var http = require('http');


//Config
const port = process.env.SERVER_PORT;

const server =  express();

server.listen(port, ()=>{
  console.log(`Server listening on port : ${port}`);
})

var connection = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
});

connection.connect(function(error){
  if(error){
    console.log(error);
  }
  else{
    console.log(`Connected to database : ${process.env.DB_NAME}`);
  }
});
