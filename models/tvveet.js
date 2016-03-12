var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user.js');

var Tvveet = new Schema({
	_id: {type: String},
	content: String,
	author: String
}, {collection: 'Tvveet'});
// I wouldn't specify collection twice once in the schema and once in the model
module.exports = mongoose.model('Tvveet', Tvveet);
