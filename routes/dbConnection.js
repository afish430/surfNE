var mongoose = require('mongoose');
var colors = require('colors');

var dbUrl = 'mongodb://127.0.0.1:27017/surfnewengland';
var connection = null;
var model = null;

mongoose.Promise = global.Promise;

var schemas = require('../schemas.js');

module.exports = {	
	getSurfSpotModel: function getSurfSpotModel() {
		if (connection == null) {
			console.log("Creating connection and surf spot model...".green);
			connection = mongoose.createConnection(dbUrl);
		};
		model = connection.model("SurfSpotModel", schemas.surfSpotSchema);
		return model;
	},
		getUserModel: function getUserModel() {
		if (connection == null) {
			console.log("Creating connection and user model...".green);
			connection = mongoose.createConnection(dbUrl);
		};
		model = connection.model("UserModel", schemas.userSchema);
		return model;
	},
		getCommentModel: function getCommentModel() {
		if (connection == null) {
			console.log("Creating connection and comment model...".green);
			connection = mongoose.createConnection(dbUrl);
		};
		model = connection.model("CommentModel", schemas.commentSchema);
		return model;
	}
};
























