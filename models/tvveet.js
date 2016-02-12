var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user.js')

var Tvveet = new Schema({
	content: String,
	author: String
}, {collection: 'Tvveet'});

module.exports = mongoose.model('Tvveet', Tvveet);