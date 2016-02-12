var express = require('express');
var router = express.Router();

var Tvveet = require('../models/tvveet.js')

/* GET tvveets */
router.get('/', function(req, res, next) {
	Tvveet.find().sort({$natural: -1}).exec(function(err, tvveets){
		if (err){ return console.error(err) }
		tvveets.reverse()
		res.json({Tvveets: tvveets})
	})
});

/* POST users/post -- create new Tvveet object in mongo */
router.post('/post', function(req, res, next) {
	var newTvveet = new Tvveet({
		content: req.body.content,
		author: req.body.author
	});

	newTvveet.save(function(err){
		if (err){ return console.error(err); }

		response = {Success: true}
		res.status(200).json({response})
	})
})

module.exports = router;
