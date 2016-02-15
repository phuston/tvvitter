var express = require('express');
var router = express.Router();

var Async = require('async');

var Tvveet = require('../models/tvveet.js');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	Async.parallel([

		function(callback) {
			var query = Tvveet.find({}).sort({$natural: -1});

			query.exec(function(err, tvveets){
				if(err){ 
					callback(err);
				}
				callback(null, tvveets);
			})
		},

		function(callback) {
			var query = User.find({})

			query.exec(function(err, users){
				if(err){
					callback(err);
				}
				callback(null, users);
			})
		}
	],
	 
	//Compute all results
	function(err, results) {
		if (err) {
			console.log(err);
			return res.send(400);
	    }
	 
	    if (results == null || results[0] == null) {
	        return res.send(400);
	    }
	 
	    //results contains [tvveets, users]
	    var tvveets = results[0] || [];
	    var users = results[1] || [];
	 
	    return res.status(200).render('index', {Tvveets: tvveets, Users: users, Username: req.user});
	});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

module.exports = router;
