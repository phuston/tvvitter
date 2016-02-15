var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	username: String,
	password: String
}, {collection: 'User'});

module.exports = mongoose.model('User', User);