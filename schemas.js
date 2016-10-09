var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
	swellInfoLink: String,
	msw_id: Number
});

var userSchema = new Schema({
	userName: String,
	password: String,
	isAdmin: Boolean
});

var commentSchema = new Schema({
	userName: String,
	timestamp: Date,
	text: String,
	surfSpotId: String,
	imagePath: String
});

module.exports = {
	surfSpotSchema: surfSpotSchema,
	userSchema: userSchema,
	commentSchema: commentSchema
}
