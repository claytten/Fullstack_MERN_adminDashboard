/** /app/route.js
 *route.js has deified all end points and forward request fr corresponding controller.
 * @type {*|exports|module.exports as route}
 */
const express = require('express');  //load express module to crate instance of app
//The express.Router class can be used to create modular mountable route handlers.
// A Router instance is a complete middleware and routing system;
const router = express.Router();

const LoginController = require('../app/controllers/auth/LoginController');
const { verifySignUp } = require("../app/controllers/Middleware/middleware");

//==========Login end point('/api/login')===========================================
router
    .route('/api/login')
    .post(LoginController.login);
router
    .route('/api/register')
    .post(LoginController.register);


module.exports = router;
