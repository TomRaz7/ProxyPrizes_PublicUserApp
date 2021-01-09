var express = require("express");
var mysql = require("mysql");
require("dotenv").config(); //to read env variables defined in the .env
var http = require("http");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const nodemailer = require('nodemailer');
const newPasswdGenerator = require('generate-password');

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 2500 });

//Config
const port = process.env.SERVER_PORT;

const server = express();

server.use(bodyParser.json({ type: "application/json" }));
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});

//Configure the Database connection
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Connected to database : ${process.env.DB_NAME}`);
  }
});

server.get("/renderShops", function (req, res) {
  const key = `renderShops`;
  if (cache.get(key) !== undefined) {
    res.send(cache.get(key));
  } else {
    connection.query("SELECT * FROM shop", function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        //store the data in the cache
        console.log("Préparation pour le cache");
        console.log(rows);
        cache.set(key, rows);
        res.send(rows);
      }
    });
  }
});

server.get("/allPosts", function (req, res) {
  connection.query("SELECT * FROM post", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
});

server.post("/retrieveSingleShopPosts", function (req, res) {
  console.log(req.body);
  var shop = req.body.shop;
  console.log(shop);
  connection.query(
    `SELECT * FROM post WHERE shop = ${shop};`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Posts pour le shop`);
        console.log(rows);
        res.send(rows);
      }
    }
  );
});

server.post("/filterPosts", function (req, res) {
  var category = req.body.category.toString();
  if (category === "all") {
    connection.query("SELECT * FROM post", function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          datas: rows,
          filter: category,
        });
      }
    });
  } else {
    var key = `filterPosts_${category}`;
    if (cache.get(key) !== undefined) {
      console.log("Retrive data from cache");
      console.log(cache.get(key));
      var response = {
        datas: cache.get(key),
      };
      res.send(response);
    } else {
      connection.query(
        `SELECT * FROM post WHERE categorytag = '${category}';`,
        function (error, rows, fields) {
          if (error) {
            console.log(error);
          } else {
            console.log("Storage of the following data within the cache");
            console.log(rows);
            cache.set(key, rows);
            res.json({
              datas: rows,
              filter: category,
            });
          }
        }
      );
    }
  }
});

server.post("/retrieveDiscountsShops", function (req, res) {
  var discounts = req.body;
  var shopId = null;
  var index = 0; //increment to retrieve as many shops as the number of discounts cause each discounts is related to a single shop
  var resultArray = [];
  if (discounts.length > 0) {
    for (let i = 0; i < discounts.length; i++) {
      shopId = discounts[i].shop;
      connection.query(
        `SELECT name, adress, picture FROM shop WHERE id = ${shopId};`,
        function (error, rows, fields) {
          if (error) {
            console.error();
          } else {
            let shopName = rows[0].name;
            let shopAdress = rows[0].adress;
            let shopPicture = rows[0].picture;
            resultArray.push({ shopName, shopAdress, shopPicture });
            index += 1;
            if (index === discounts.length) {
              res.send(resultArray);
            }
          }
        }
      );
    }
  } else {
    console.log("empty array given");
  }
});

server.post("/retrivePostsPublishers", function (req, res) {
  var publishersArray = [];
  let publisherId = null;
  let tableToQUery = "";
  let posts = req.body;
  let index = 0;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].owner !== null) {
      publisherId = posts[i].owner;
      tableToQUery = "OWNER";
    } else if (posts[i].customer !== null) {
      publisherId = posts[i].customer;
      tableToQUery = "CUSTOMER";
    }
    connection.query(
      `SELECT forname, picture FROM ${tableToQUery} WHERE id = ${publisherId};`,
      function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          let publisherForname = rows[0].forname;
          let publisherPicture = rows[0].picture;
          publishersArray.push({ publisherForname, publisherPicture });
          index += 1;
          if (index === posts.length) {
            //each post as been published by a user so we need to retrievethe same number of user within the publishersArray (=index) than the number of posts (=posts.length)
            res.send(publishersArray);
          }
        }
      }
    );
  }
});

//Login function
server.post("/login", function (req, res) {
  console.log("login endpoint hitted");
  var tableToQUery = req.body.table;
  var userMail = req.body.email;
  var userPassword = req.body.password;

  if (tableToQUery === "customer") {
    connection.query(
      `SELECT * FROM customer WHERE email = '${userMail}' AND password = '${userPassword}';`,
      function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          if (rows[0] !== undefined) {
            var user = rows[0];
            console.log(user);
            jwt.sign({ user: user }, "secretKey", (err, token) => {
              res.json({
                code: 200,
                user: user,
                token: token,
              });
            });
          } else {
            res.json({
              code: 404,
            });
          }
        }
      }
    );
  } else if (tableToQUery === "owner") {
    console.log("Query owner table");
  } else {
    console.log("Query employee table");
  }
});

server.post("/retrieveUserDiscounts", function (req, res) {
  console.log("/retrieveUserDiscounts hitted");
  var user = req.body.userId;
  connection.query(
    `SELECT * FROM discount WHERE beneficiary = ${user};`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("dicounts retrouvées");
        console.log(rows);
        res.send(rows);
      }
    }
  );
});

//New account creation
server.post("/createAccount", function (req, res) {
  //affect the request parameters values to local variables
  var tableToQUery = req.body.table;
  var userPassword = req.body.password;
  var userMail = req.body.email;
  var userName = req.body.name;
  var userForname = req.body.forname;
  var userProfilPicture = req.body.picture;
  var userAdress = req.body.adress;
  var userCity = req.body.city;
  var userBirthDate = req.body.birthdate;
  var userPhone = req.body.phone;
  var result = null;
  var responseObject = {
    code: null,
    mail: req.body.email,
  };

  if (tableToQUery === "customer") {
    connection.query(
      `INSERT INTO customer(email, password, name, forname, picture, phone, adress, city, birthdate) VALUES ('${userMail}','${userPassword}','${userName}','${userForname}','${userProfilPicture}','${userPhone}','${userAdress}','${userCity}','${userBirthDate}');`,
      function (error, rows, fields) {
        if (error) {
          console.log();
        } else {
          result = rows;
          if (result !== null) {
            responseObject.code = 200;
            res.send(responseObject);
          }
        }
      }
    );
  } else if (tableToQUery === "owner") {
    //connection.query(`INSERT INTO owner(name, forname, picture, password, email, phone, siret) VALUES ('${}','');`, function(error, rows, fields){
    if (error) {
      console.log(error);
    } else {
      console.log("New records inserted in DB");
    }
    //});
  } else {
    //connection.query(`INSERT INTO employee(email, paswword, name, forname, phone, worksforshop) VALUES ('${}','');`, function(error, rows, fields){
    if (error) {
      console.log(error);
    } else {
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
    categorytag: req.body.categorytag,
  };
  var sql = "INSERT INTO post SET ?";
  connection.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    var key = `filterPosts_${req.body.categorytag}`;
    //add the new post to the post cache if it exists
    if (cache.get(key) !== undefined) {
      var appendToCache = cache.get(key);
      appendToCache.push(Object.assign({ id: req.body.title }, data));
      cache.set(key, appendToCache);
    }
    res.send({
      status: "Data inserted!",
    });
  });
});

server.post("/deletePost", function (req, res) {
  console.log("/deletePost hitted");
  var postId = req.body.postId;

  var dbQuery = `DELETE FROM post WHERE id =${postId};`;

  connection.query(dbQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log("Post deleted.");
      //console.log(rows);
      res.send(rows);
    }
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

server.post("/addExpoToken", function (req, res) {
  console.log("/addExpoToken hitted");
  if(req.body.userId !==undefined){
    var user = req.body.userId;
    var expoToken = req.body.expoToken;
    connection.query(
      `UPDATE customer SET expoToken='${expoToken}' WHERE id =${user};`,
      function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log("Table updated!");
          //console.log(rows);
          res.send(rows);
        }
      }
    );
  }
});

server.post("/retrieveExpoToken", function (req, res) {
  console.log("/retrieveExpoToken hitted");
  var userId = req.body.userId;
  var action = req.body.toWho;
  var isShop = req.body.isShop;

  if (action === "single" && isShop !== "yes") {
    var dbQuery = `SELECT expoToken FROM customer WHERE id = ${userId};`;
  } else if (action === "all" && isShop !== "yes") {
    var dbQuery = `SELECT expoToken FROM customer;`;
  } else if (action === "single" && isShop === "yes") {
    var dbQuery = `SELECT expoToken FROM owner WHERE id = ${userId};`;
  } else if (action === "all" && isShop === "yes") {
    var dbQuery = `SELECT expoToken FROM owner WHERE id = ${userId};`;
  }

  connection.query(dbQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      //console.log("Table updated!");
      //console.log(rows[0].expoToken);
      res.send(rows);
    }
  });
});

// function to act as a post was liked or disliked, incrementing the likecounter in the database
server.post("/likePost", function (req, res) {
  console.log("/likePost hitted");
  var postId = req.body.postId;
  var action = req.body.action;
  console.log(action);

  if (action === "like") {
    var dbQuery = `UPDATE post SET likecounter = likecounter + 1 WHERE id =${postId};`;
  } else if (action === "dislike") {
    var dbQuery = `UPDATE post SET likecounter = likecounter - 1 WHERE id =${postId};`;
  }

  connection.query(dbQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log("Table updated!" + action);
      //console.log(rows);
      res.send(rows);
    }
  });
});

server.post("/sendNotification", function (req, res) {
  console.log("/sendNotification hitted");
  // create the content of the notifications
  const message = {
    to: req.body.expoToken, // token of device that will receive notifications
    sound: "default",
    title: req.body.notificationTitle, // title
    body: req.body.notificationBody, // body
  };
  console.log(message);
  // Sends notification to the expo server, then he will deliver it within 30min
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      host: "exp.host",
      accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      // sends the response, with status and receipt id (for checking wheter or not the device received the notification)
      res.send(responseJson);
    });
});

// function to manage the avaliability requests from the user
server.post("/addAvaliabilityRequest", function (req, res) {
  console.log("/addAvaliabilityRequest hitted");
  var data = {
    creator: req.body.customer,
    shop: req.body.shop,
    description: req.body.description,
    status: "pending",
    answer: "no answer",
  };
  console.log(data);

  var sql = "INSERT INTO request SET ?";

  connection.query(sql, data, (err, result) => {
    if (err) throw err;
    else {
      res.send({
        status: "Data inserted!",
      });
    }
  });
});

server.post("/getAvaliabilityRequest", function (req, res) {
  console.log("/getAvaliabilityRequest hitted");
  var user = req.body.userId;
  connection.query(
    `SELECT * FROM request WHERE creator = ${user};`,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    }
  );
});

// function to manage the avaliability requests from the user
server.post("/getShopOwner", function (req, res) {
  console.log("/getShopOwner hitted");
  var shopId = req.body.shop;

  var sql = `SELECT owner FROM shop WHERE id = ${shopId};`;

  connection.query(sql, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
});

server.post('/stripePayment', async function(req,res){
  console.log('/stripePayment Hitted');
  console.log(req.body);
  const stripeToken = req.body.authToken;
  const email = req.body.email;
  const product = req.body.product;
  try{
    const customer = await stripe.customers.create({
      email:email,
      source: stripeToken.tokenId
    });

    const response = await stripe.charges.create({
      amount:product.price*100,
      currency:'EUR',
      customer:customer.id,
      receipt_email:email,
      description:product.title,
    });

    console.log("Charges response");
    console.log(response);
    res.send(response);

  }catch(err){
    console.log("============================================Error======================================");
    console.log(err);
    res.send(err);
  }
})

server.post('/retrievePasswd', function(req,res){
  console.log('/retrievePasswd hitted');
  const mail = req.body.mail.toString();
  const newPasswd = newPasswdGenerator.generate({
    length:10,
    numbers:true,
    symbols:true
  })

  var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", // hostname of the fake smtp
    secure: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWD
    },
    tls: {
          rejectUnauthorized: false
      }
  });

  var mailOptions = {
    from:process.env.EMAIL_ACCOUNT,
    to:process.env.EMAIL_ACCOUNT,
    subject:'Password forgotten',
    html:`<h1>New password generated ! </h1><p>You\'ve sent a retrieve password request. A new password has been created and link with your account : </p> <p>${newPasswd})</p>`
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('Mail error : ');
      console.log(error);
    }else{
      console.log('Email sent: '+info.response);
      connection.query(`UPDATE customer SET password='${newPasswd}' WHERE email ='${mail}';`,function(error, rows, fields){
        if(error){
          console.log(error);
        } else{
          console.log("Table updated!");
          res.send(rows);
        }
      });
    }
  });
})
