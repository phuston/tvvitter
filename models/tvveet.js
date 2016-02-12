var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user.js')

var Tvveet = new Schema({
	_id: {type: String},
	content: String,
	author: String
}, {collection: 'Tvveet'});

module.exports = mongoose.model('Tvveet', Tvveet);