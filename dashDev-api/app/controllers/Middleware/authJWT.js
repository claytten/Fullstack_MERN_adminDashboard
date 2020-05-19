const jwt = require("jsonwebtoken");
const config = require('../../../config/databases'); 
const db = require("../../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.body.token || req.query.token || req.headers['x-access-token'];
        // split at the space
        const bearer = bearerHeader.split('xT!d4_K');
        //get token from array
        const bearerToken = bearer[1];
        const decode = jwt.verify(bearerToken, config.secretOrKey, function (err, decoded) {
            console.log(decoded);
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        });
    } catch(err) {
        res.json({
            success: false,
            statusCode: 403,
            errMessage: 'Unauthorized Access: Failed to authenticate token.'
        });
    }
};

isAdmin = (req, res, next) => {
  console.log(req);
  User.findById(req.headers.userid).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(user);
    console.log(user.roles);

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin" || roles[i].name === "superadmin") {
            next();
            return;
          }
        }

        res.json({success:false, message: "You are not allowed!", data:null});
        return;
      }
    );
  });
};

isSuperadmin = (req, res, next) => {
  User.findById(req.headers.userid).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "superadmin") {
            next();
            return;
          }
        }

        res.json({success:false, message: "You are not allowed!", data:null});
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isSuperadmin
};
module.exports = authJwt;