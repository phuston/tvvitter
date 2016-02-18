require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Tvveet = require('./../../../models/tvveet');
var ObjectID = require('mongodb').ObjectID;


describe('Tvveet Model', function() {

	var id = new ObjectID();
  it('should create a new tvveet', function(done) {
    var tvveet = new Tvveet({
      _id: id,
      content: "TEST TVVEET TEST TVVEET YO WHAT UP",
      author: "Patrick"
    });
    tvveet.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // What else can you test?

  it('should remove a tvveet by id', function(done) {
  	console.log(id);
    Tvveet.remove({ _id: id }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});