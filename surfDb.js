var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var schemas = require('./schemas');

module.exports = {
	getSurfSpotModel: function getSurfSpotModel(connection) {
		return connection.model("SurfSpotModel", schemas.surfSpotSchema);
	},
	getUserModel: function getUserModel(connection) {
		return connection.model("UserModel", schemas.userSchema);
	}
}
