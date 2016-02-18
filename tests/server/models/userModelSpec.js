require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var User = require('./../../../models/user');

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      username: 'Fluffy',
      password: 'Fluffy'
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // What else can you test?

  it('should remove a user by name', function(done) {
    User.remove({ name: 'Fluffy' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});