/**
 *User Controller for endpoint '/api/login' POST request
 */
//=======================Load all the required module.==============================================
const jwt = require('jsonwebtoken');  //generate a access token so all other end points can be secure.
const db = require("../../models");
const User = db.user;
const Role = db.role;
const config = require('../../../config/databases');  //load configuration parameters.
const bcrypt = require('bcrypt'); 

/**
 * Register a user with application on end point '/api/users'
 *
 * @param  {req as json} user name and password.
 * @return {res as json} success as false(failure) or true(success), status code and access token to geet access of all other end points..
 */

exports.login = function (req, res) {
    // find the user in database
    User.findOne({
        email: req.body.email
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            console.log(user);
            if (err) {
                res.json({success: false, statusCode: 500, errorMessage: err});
            }
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    var authorities = [];

                    for (let i = 0; i < user.roles.length; i++) {
                        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
                    }

                    const token = jwt.sign(
                        {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }, 
                        config.secretOrKey, { expiresIn: 1440 }
                    );
                    

                    user['roles'] = authorities;
                    console.log(user.roles[0].name);
                    if(user.roles[0].name === "admin" || user.roles[0].name === "superadmin") {
                        res.json({
                            success:true, 
                            message: "user found!!!", 
                            data:{
                                id: user._id,
                                email: user.email,
                                roles: authorities,
                                token:token
                            }});
                        
                    } else {
                        res.json({success:false, message: "You are not allowed!", data:null});
                    }
                }else{
                    res.json({success:false, message: "Authentication failed. Invalid User.", data:null});
                }
            }else{
                res.json({success:false, message: "Authentication failed. Invalid User.", data:null});
            }
        });
    
};

exports.register = function (req,res) {
    console.log(req.body);
    //check whether email ID is unique or not, if not then ask user to register with a email which does not already exist.
    User.findOne({email: req.body.email}, function (err, user) {
        //If there is any error connecting with database or fetching result, send error message as response.
        if (err) {
            return res.json({status: "failed", statusCode: 500, errorMessage: err});
        }
        //check if user found in system with sam email ID, send response as email already exist in application.
        if (user) {
            return res.json({status: "failed", statusCode: 302, errorMessage: 'Email ID is already exist in system'});
        } else {
            var user = new User();
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;
            user.description = null;
            user.save((err, user) => {
                Role.findOne({ name: "superadmin" }, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
            
                    user.roles = [role._id];
                    user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
            
                    res.send({ message: "User was registered successfully!" });
                    });
                });
            });
        }
    });
}