var express = require('express');
var mysql = require('mysql');
require('dotenv').config(); //to read env variables defined in the .env
var http = require('http');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');

const cache = new NodeCache( { stdTTL: 3600, checkperiod: 2500 } );

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
  const key = `renderShops`;
  if(cache.get(key) !== undefined){
    res.send(cache.get(key));
  }
  else{
    connection.query('SELECT * FROM shop',function(error, rows, fields){
      if(error){
        console.log(error);
      }
      else{
        //store the data in the cache
        console.log("Préparation pour le cache");
        console.log(rows);
        cache.set(key, rows);
        res.send(rows);
      }
    })
  }
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
  console.log(req.body);
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

server.post('/filterPosts', function(req, res){
  var category = req.body.category.toString();
  console.log(category);
  if(category === 'all'){
    connection.query('SELECT * FROM post',function(error, rows, fields){
      if(error){
        console.log(error);
      }
      else{
        res.json({
          datas:rows,
          filter:category
        });
      }
    })
  }
  else{
    var key = `filterPosts_${category}`;
    if(cache.get(key) !== undefined){
      console.log("Retrive data from cache");
      console.log(cache.get(key));
      var response ={
        datas:cache.get(key)
      }
      res.send(response);
    }
    else{
      connection.query(`SELECT * FROM post WHERE categorytag = '${category}';`, function(error, rows, fields){
        if(error){
          console.log(error);
        }
        else{
          console.log("Storage of the following data within the cache");
          console.log(rows);
          cache.set(key, rows);
          res.json({
            datas:rows,
            filter:category
          });
        }
      });
    }
  }
})

server.post('/retrieveDiscountsShops',function(req,res){
  var discounts = req.body;
  var shopId = null;
  var index = 0; //increment to retrieve as many shops as the number of discounts cause each discounts is related to a single shop
  var resultArray = [];
  if(discounts.length > 0){
    for(let i = 0; i<discounts.length; i++){
      shopId = discounts[i].shop;
      connection.query(`SELECT name, adress, picture FROM shop WHERE id = ${shopId};`,function(error, rows, fields){
        if(error){
          console.error();
        }
        else{
          let shopName = rows[0].name;
          let shopAdress = rows[0].adress;
          let shopPicture = rows[0].picture;
          resultArray.push({shopName,shopAdress,shopPicture});
          index += 1;
          if(index === discounts.length){
            res.send(resultArray);
          }
        }
      });
    }
  }
  else{
    console.log("empty array given");
  }
})

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

//Login function
server.post('/login', function(req,res){
  console.log('login endpoint hitted');
  var tableToQUery = req.body.table;
  var userMail = req.body.email;
  var userPassword = req.body.password;

  if(tableToQUery === 'customer'){
    connection.query(`SELECT * FROM customer WHERE email = '${userMail}' AND password = '${userPassword}';`,function(error, rows, fields){
      if(error){
        console.log(error);
      }
      else{
        if(rows[0] !== undefined){
          var user = rows[0];
          console.log(user);
          jwt.sign({user:user}, 'secretKey', (err, token) => {
             res.json({
               code:200,
               user:user,
               token:token
             });
          });
        }
        else{
          res.json({
            code:404
          })
        }
      }
    });
  }
  else if (tableToQUery === 'owner'){
    console.log("Query owner table");
  }
  else{
    console.log("Query employee table");
  }
});


server.post('/retrieveUserDiscounts', function(req,res){
  console.log("/retrieveUserDiscounts hitted");
  var user = req.body.userId
  connection.query(`SELECT * FROM discount WHERE beneficiary = ${user};`, function(error, rows, fields){
    if(error){
      console.log(error);
    }
    else{
      console.log("dicounts retrouvées");
      console.log(rows);
      res.send(rows);
    }
  });
})

//New account creation
server.post('/createAccount',function(req,res){
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
  var result = null
  var responseObject = {
    code:null,
    mail:req.body.email
  }

  if(tableToQUery === 'customer'){
    connection.query(`INSERT INTO customer(email, password, name, forname, picture, phone, adress, city, birthdate) VALUES ('${userMail}','${userPassword}','${userName}','${userForname}','${userProfilPicture}','${userPhone}','${userAdress}','${userCity}','${userBirthDate}');`,function(error, rows, fields){
      if(error){
        console.log();
      }
      else{
        result = rows;
        if(result !== null){
          responseObject.code = 200
          res.send(responseObject);
        }
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
      }
    //});
  }
});


// addpost to the database
server.post("/addPost", function (req, res) {
  console.log(req.body);
  var data = {
    title: req.body.title,
    description: req.body.description,
    picture: req.body.picture,
    price: req.body.price,
    likeCounter: 0,
    publishedAt: req.body.publishedAt,
    shop: req.body.shop,
    owner: req.body.owner,
    customer: req.body.customer,
    categorytag:req.body.categorytag
  };
  var sql = "INSERT INTO post SET ?";
  connection.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    var key = `filterPosts_${req.body.categorytag}`;
    //add the new post to the post cache if it exists
    if(cache.get(key)!== undefined){
      var appendToCache = cache.get(key);
      appendToCache.push(Object.assign({id:req.body.title}, data))
      cache.set(key, appendToCache);
    }
    res.send({
      status: "Data inserted!",
    });
  });
});

//get s3 credentials
server.get("/getS3", (req, res) => {
  const answer = {
    accessKey: process.env.AKID,
    secretKey: process.env.SAK,
  };
  res.send(answer);
});
