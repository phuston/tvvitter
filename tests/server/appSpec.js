var request = require('supertest');
var app = require('./../../app.js');

describe("App", function() {
  it('should return 200 OK on GET /login', function(done) {
    request(app)
      .get('/login')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  

  // What other routes can you test?

  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
});