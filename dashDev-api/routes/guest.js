/** /app/route.js
 *route.js has deified all end points and forward request fr corresponding controller.
 * @type {*|exports|module.exports as route}
 */
var express = require('express');  //load express module to crate instance of app
//The express.Router class can be used to create modular mountable route handlers.
// A Router instance is a complete middleware and routing system;
var router = express.Router();

var IndexController = require('../app/controllers/IndexController');
//get Route API to just check route end point is working fine.
router.route('/')
    .get(IndexController.getWelcomeMessage);

module.exports = router;
