//==============LOAD ALL REQUIRED MODULES========================================
//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
var mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    firstName: String,  //String type
    lastName: String,  //String type
    email: {type: String, required: true},  //String type and required
    password: {type: String, required: true}, //Number type and required
    description: String,
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
    ]
});

// Bcrypt middleware on UserSchema
UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        console.log(err,salt,user.password);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//Password verification
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// make this available to our users in our Node applications
module.exports = mongoose.model('User', UserSchema);
