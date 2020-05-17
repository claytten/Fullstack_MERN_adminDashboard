//================LOAD ALL REQUIRED MODULE=====================================
//Object schema description language and validator for JavaScript objects.
var Joi = require('joi');
//contact request validation module for all parameters exist in req.body
module.exports.register = {
    options: {flatten: true},
    body: {

        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        roles: Joi.string().required()
    }
};

module.exports.login = {
    options: {flatten: true},
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

module.exports.update = {
    options: {flatten: true},
    body: {
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().required()
    }
};

