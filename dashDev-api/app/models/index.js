const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./users/User");
db.role = require("./roles/Roles");

db.ROLES = ["user", "admin", "superadmin"];

module.exports = db;