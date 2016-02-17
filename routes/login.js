var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req,res,next){
	res.render('login');
});

router.post('/', 
	passport.authenticate('local', { failureRedirect: '/login' }),
  	function(req, res) {
    	res.redirect('/');
  	});

module.exports = router;