var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

/* GET users */
router.get('/', function(req, res, next) {
	User.find({}).exec(function(err, users){
		if (err){ return console.error(err); }
		res.json({Success: true, Users: users});
	});
});

module.exports = router;
