/** /app/route.js
 *route.js has deified all end points and forward request fr corresponding controller.
 * @type {*|exports|module.exports as route}
 */
var express = require('express');  //load express module to crate instance of app
//The express.Router class can be used to create modular mountable route handlers.
// A Router instance is a complete middleware and routing system;
var router = express.Router();
//express-validation is a middleware that validates the body, params, query,
// headers and cookies of a request and returns a response with errors;
//we have used it for contact request parameters validation with JOI.
var validate = require('express-validation');

var AdminController = require('../app/controllers/users/AdminController');
//load validation module to validate input requests parameter.
var validation = require('../app/models/utils/Validation');
const { authJWT } = require("../app/controllers/Middleware/middleware");


router.get('/api/user', authJWT.verifyToken, authJWT.isAdmin, AdminController.user.getAllUsers);
router.post('/api/user', authJWT.verifyToken, authJWT.isSuperadmin, validate(validation.register), AdminController.user.register);

router.get('/api/user/update/:id', authJWT.verifyToken, AdminController.user.getUserId);
router.put('/api/user/update/:id', authJWT.verifyToken, validate(validation.update), AdminController.user.update);

router.delete('/api/user/delete/:id', authJWT.verifyToken, AdminController.user.destroy);

module.exports = router;
