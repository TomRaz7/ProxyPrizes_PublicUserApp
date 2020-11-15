var express = require("express");
var mysql = require("mysql");
require("dotenv").config(); //to read env variables defined in the .env
var http = require("http");
var bodyParser = require("body-parser");

//Config
const port = process.env.SERVER_PORT;

const server = express();

server.use(bodyParser.json({ type: "application/json" }));
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});

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
  connection.query("SELECT * FROM shop", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
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
            res.send(publishersArray);
          }
        }
      }
    );
  }
});

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
  };
  var sql = "INSERT INTO post SET ?";
  connection.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "Data inserted!",
    });
  });
});
