var express = require('express');
var router = express.Router();

var User = require('../models/user.js')

/* GET users */
router.get('/', function(req, res, next) {
	User.find({}).exec(function(err, users){
		if (err){ return console.error(err) }
		res.json({Users: users})
	})
});

/* POST users/login -- logs in if exists, creates if doesn't */
router.post('/login', function(req, res, next) {
	var newUser = {
		username: req.body.username
	}

	User.findOneAndUpdate({username: req.body.username}, {$setOnInsert: newUser}, {upsert: true}, function(err, user){
		if(user) {
			userCreated = false;
		} else {
			userCreated = true;
		}
		var response = {UserCreated: userCreated, UserName: req.body.username};
		res.status(200).json(response);
	})
})

module.exports = router;
