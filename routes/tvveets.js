var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var Tvveet = require('../models/tvveet.js');

/* GET tvveets */
router.get('/', function(req, res, next) {
	Tvveet.find().sort({$natural: -1}).exec(function(err, tvveets){
		if (err){ return console.error(err); }
		tvveets.reverse();
		res.json({Success: true, Tvveets: tvveets});
	});
});

/* POST tvveets/post */
router.post('/post', function(req, res, next) {
        //Tvveet.create() should create and save for you
	var newTvveet = new Tvveet({
		_id: new ObjectID(),
		content: req.body.content,
		author: req.body.author
	});

	newTvveet.save(function(err){
		if (err){ return console.error(err); }

		response = {Success: true, id: newTvveet._id};
		res.status(200).json(response);
	});
});

/* POST tvveets/delete */
router.post('/delete', function(req, res, next) {
	Tvveet.findByIdAndRemove(req.body.id, function (err, tvveet){
    	if(err) {return console.error(err);}

    	console.log(tvveet);
    	res.json({Success: true});
	});
});

module.exports = router;
