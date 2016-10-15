var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

mongoose.Promise = global.Promise;

var surfSpotSchema = new Schema({
	name: String,
	town: String,
	state: String,
	latitude: Number,
	longitude: Number,
	description: String,
	infoLink: String,
	surfShopLink: String,
	surflineLink: String,
	mswLink: String,
	swellInfoLink: String
	//msw_id: Number
});

var commentSchema = new Schema({
	userName: String,
	timestamp: Date,
	text: String,
	surfSpotId: String,
	imagePath: String
});

var userSchema = new Schema({
	userName: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	isAdmin: Boolean
});

//Use bcrypt to encrypt user passwords
userSchema.pre('save', function(next) {
    var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if (err) return next(err);

	    // hash the password using our new salt
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        if (err) return next(err);

	        // override the cleartext password with the hashed one
	        user.password = hash;
	        next();
	    });
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = {
	surfSpotSchema: surfSpotSchema,
	userSchema: userSchema,
	commentSchema: commentSchema
}
