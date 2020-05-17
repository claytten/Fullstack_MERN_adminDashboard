/**
 *User Controller for endpoint '/api/users/ POST/GET
 */
//=================Load all required module=============================================================
const db = require("../../models");
const User = db.user;
const Role = db.role;

exports.user = {
    /**
     * Register a user with application on end point '/api/users'
     *
     * @param  {req as json} firstName, lastName, email(email), password
     * @return {res as json} status as false(failure) or true(status), status code and message of success or failure
     */
    register: function (req, res) {
        
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
                    if (req.body.roles) {
                        Role.find(
                        {
                            name: { $in: req.body.roles }
                        },
                        (err, roles) => {
                            if (err) {
                                res.status(500).send({ message: err , success: false});
                            return;
                            }
                
                            user.roles = roles.map(role => role._id);
                            
                            user.save(err => {
                            if (err) {
                                res.status(500).send({ message: err, success: false });
                                return;
                            }
                
                            res.send({ success: true, message: "User was registered successfully!" });
                            });
                        });
                    } else {
                        Role.findOne({ name: "user" }, (err, role) => {
                            if (err) {
                                res.status(500).send({ message: err, success: false });
                                return;
                            }
                    
                            user.roles = [role._id];
                            user.save(err => {
                            if (err) {
                                res.status(500).send({ message: err, success: false });
                                return;
                            }
                    
                            res.send({ success: true, message: "User was registered successfully!" });
                            });
                        });
                    }
                    

                });
            }
        });
    },

    /**
     * Register a user with application on end point '/api/users'
     *
     * @param  {req as json} x-access-token to get access of API
     * @return {res as json} status as false(failure) or true(status), status code and data as list of all available users in system.
     */

    getAllUsers: function (req, res) {
        User.find({})
            .populate("roles", "-__v")
            .exec((err, users) => {
                //If there is any error connecting with database or fetching result, send error message as response.
                if (err) {
                    res.json({success: false, statusCode: 500, errorMessage: err});
                }
                
                var authorities = [];

                for (let i=0; i < users.length; i++) {
                    for(let j = 0; j< users[i].roles.length; j++) {
                        authorities.push(users[i].roles[j].name);
                    }
                }

                for(let i=0; i<authorities.length; i++) {
                    users[i].roles = authorities[i];
                }

                //If able to fetch all users then send them in response in data key.
                res.json({success: true, statusCode: 200, data: users });
            });

    },

    /**
     * Find user by Id with application on end point '/api/users'
     *
     * @param  {req as json} x-access-token to get access of API
     * @return {res as json} status as false(failure) or true(status), status code and data as list of all available users in system.
     */

    getUserId: function (req, res) {
        User.findById(req.params.id, function (err, userInfo) {
            //If there is any error connecting with database or fetching result, send error message as response.
            if (err) {
                res.json({success:false, statusCode: 500, errorMessage: err});
            }
            //If able to fetch all users then send them in response in data key.
            res.json({success: true, statusCode: 200, data:{User: userInfo} });
        })
    },

    /**
     * Update User with application on end point '/api/users/update'
     *
     * @param  {req as json} firstName, lastName, email(email), password
     * @return {res as json} status as false(failure) or true(status), status code and message of status or failure
     */
    update: function (req, res) {
        //check whether email ID is unique or not, if not then ask user to register with a email which does not already exist.
        User.findById(req.params.id, function (err, user) {
            //check if user found in system with sam email ID.
            if (!user) {
                return res.json({status: "failed", statusCode: 302, errorMessage: 'Warning! Update unsuccessfully'});
            } else {
                if(req.body.password === "" || req.body.password == null) {
                    req.body.password = user.password
                }
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.password = req.body.password;
                user.description = req.body.description !== '' ? req.body.description : null;
                user.save(function (err,users) {
                    if (err) {
                        return res.json({status: "failed", statusCode: 500, errorMessage: err});
                    }

                    if (req.body.roles) {
                        Role.find(
                        {
                            name: { $in: req.body.roles }
                        },
                        (err, roles) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                
                            users.roles = roles.map(role => role._id);
                            
                            users.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                
                            res.json({success: true, statusCode: 200, message: "User has been updated successfully", data: users});
                            });
                        });
                    } else {
                        res.json({success: true, statusCode: 200, message: "User has been updated successfully", data: users});
                    }
                });
            }
        });
    },

    /**
     * Destroy user by Id with application on end point '/api/users'
     *
     * @param  {req as json} x-access-token to get access of API
     * @return {res as json} status as false(failure) or true(status), status code and data as list of all available users in system.
     */

    destroy: function (req, res) {
        User.findByIdAndRemove(req.params.id, function(err, userInfo){
            //If there is any error connecting with database or fetching result, send error message as response.
            if (err) {
                res.json({success: false, statusCode: 500, errorMessage: err});
            }
            //If able to fetch all users then send them in response in data key.
            res.json({success: true , statusCode: 200, data: null});
        })
    },
};
