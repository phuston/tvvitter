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

/* Structurally, this looks good to me! I like that your describe(...) includes an it(...)
   for adding an object and an it(...) for removing the same object... it's generally good practice
   for a test to "clean up after itself" -- leave the database unmodified.

   The "new ObjectId()" mechanism is a really nice way of making sure you have a unique identifier
   for the test object you inserted into the database -- if you and someone else ran this test against the
   same remote database at the same time, there'd be essentially-zero chance of one of you deleting the other's
   test tweet.

   If you ever need random strings in a context where you don't have a convenient ObjectID constructor to call --
   I've also seen people use the current unix epoch time or a random number (or both concatenated!) for string uniqueness.
*/
