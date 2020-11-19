var express = require('express');
var mysql = require('mysql');
require('dotenv').config(); //to read env variables defined in the .env
var http = require('http');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


//Config
const port = process.env.SERVER_PORT;

const server =  express();

server.use(bodyParser.json({type:'application/json'}));
server.use(bodyParser.urlencoded({extended:true}));

server.listen(port, ()=>{
  console.log(`Server listening on port : ${port}`);
})

//Configure the Database connection
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

server.get('/renderShops',function(req,res){
  connection.query('SELECT * FROM shop',function(error, rows, fields){
    if(error){
      console.log(error);
    }
    else{
      res.send(rows);
    }
  })
});

server.get('/allPosts',function(req,res){
  connection.query('SELECT * FROM post',function(error, rows, fields){
    if(error){
      console.log(error);
    }
    else{
      res.send(rows);
    }
  })
});

server.post('/retrieveSingleShopPosts',function(req,res){
  var shop = req.body.shop;
  console.log(shop);
  connection.query(`SELECT * FROM post WHERE shop = ${shop};`, function(error, rows, fields){
    if(error){
      console.log(error);
    }
    else{
      console.log(`Posts pour le shop`);
      console.log(rows);
      res.send(rows);
    }
  });
});

server.post('/retrivePostsPublishers',function(req,res){
  var publishersArray = [];
  let publisherId = null;
  let tableToQUery = '';
  let posts = req.body;
  let index = 0;

  for(let i = 0; i< posts.length; i++){
    if(posts[i].owner !== null){
      publisherId = posts[i].owner;
      tableToQUery =  'OWNER';
    }
    else if (posts[i].customer !== null) {
      publisherId = posts[i].customer;
      tableToQUery = 'CUSTOMER';
    }
    connection.query(`SELECT forname, picture FROM ${tableToQUery} WHERE id = ${publisherId};` ,function(error, rows, fields){
      if(error){
        console.log(error);
      }
      else{
        let publisherForname = rows[0].forname;
        let publisherPicture = rows[0].picture;
        publishersArray.push({publisherForname,publisherPicture});
        index += 1;
        if(index === posts.length){
//each post as been published by a user so we need to retrievethe same number of user within the publishersArray (=index) than the number of posts (=posts.length)
          res.send(publishersArray);
        }
      }
    })
  }
});

server.post('/login', function(req,res){
  var tableToQUery = req.body.table;
  console.log('login');
});


//New account creation
server.post('/createAccount',function(req,res){
  console.log('createAccount hitted');
  //affect the request parameters values to local variables
  var tableToQUery = req.body.table;
  var userPassword = req.body.password;
  var userMail = req.body.email;
  var userName =  req.body.name;
  var userForname =  req.body.forname;
  var userProfilPicture = req.body.picture;
  var userAdress = req.body.adress;
  var userCity = req.body.city;
  var userBirthDate = req.body.birthdate;
  var userPhone = req.body.phone;

  var responseCode = null

  if(tableToQUery === 'customer'){
    connection.query(`INSERT INTO customer(email, password, name, forname, picture, phone, adress, city, birthdate) VALUES ('${userMail}','${userPassword}','${userName}','${userForname}','${userProfilPicture}','${userPhone}','${userAdress}','${userCity}','${userBirthDate}');`,function(error, rows, fields){
      if(error){
        console.log(error);
      }
      else{
        console.log(rows);
        
        //jwt.sign();
      }
    });
  }
  else if(tableToQUery === 'owner'){
    //connection.query(`INSERT INTO owner(name, forname, picture, password, email, phone, siret) VALUES ('${}','');`, function(error, rows, fields){
      if(error){
        console.log(error);
      }
      else{
        console.log("New records inserted in DB");
        //jwt.sign();
      }
    //});
  }
  else{
    //connection.query(`INSERT INTO employee(email, paswword, name, forname, phone, worksforshop) VALUES ('${}','');`, function(error, rows, fields){
      if(error){
        console.log(error);
      }
      else{
        console.log("New records inserted in DB");
        //jwt.sign();
      }
    //});
  }
});
