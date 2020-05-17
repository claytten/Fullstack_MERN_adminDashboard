/**
 * It would be our main entry js file and server will start from it
 */
//===========LOAD ALL REQUIRED MODULE=====================================
const express = require('express');  //load express module to crate instance of app
const logger = require('morgan');     //HTTP request logger middleware for node.js
const cookieParser = require('cookie-parser');  //Parse Cookie header and populate req.cookies.
//body parsing middleware, does not support multi-part, you have to use other module for multi-part parsing.
const bodyParser = require('body-parser');
//express-validation is a middleware that validates the body, params, query,
// headers and cookies of a request and returns a response with errors;
//we have used it for contact request parameters validation with JOI.
const validate = require('express-validation');
//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');
const cors = require("cors");

//Create a instance of express application.
const app = express();
//load config module to get configuration parameters about database.
const config = require('./config/databases');
const db_url = 'mongodb://' + config.host + ':' + config.db_port + '/' + config.db_name;
const db = require("./app/models");
const Role = db.role;
//connect with mongo db.
db.mongoose.connect(db_url, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})
    .then( () => {
        console.log("connected to Database!")
        initial();
    })
    .catch( err => console.log(err));

console.log(db_url);

app.use(logger('dev'));
//parse body in json format.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//adding cors
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//     console.log(req.body);
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'x-access-token,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

//Get route index so request can be redirect according to route.
app.use(require("./routes/auth"));
app.use(require("./routes/guest"));
app.use(require("./routes/admin"));


//error handler, if request parameters do not fullfil validations a error message would be sent back as response.
app.use(function (err, req, res, next) {
    // specific for validation errors
    if (err instanceof validate.ValidationError) {
        
        return res.json({status: err.status, errorMessage: err});

    }
});

app.listen(config.app_port);
console.log('Express server listening on port ' + config.app_port);

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "superadmin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'superadmin' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

