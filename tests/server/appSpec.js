var request = require('supertest');
var app = require('./../../app.js');
var server = request.agent(app);
// var should = require('should');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

var tvveetId;

describe('The app', function(){
    it('should login the user on POST /login and redirect to /', loginUser());
    it('should return 200 on GET / after logging in', function(done){
    server
        .get('/')
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
            done()
        });
    });

    it('should respond with the correct tvveet object on POST /tvveets/post', function(done){
      server
        .post('/tvveets/post')
        .send({content: 'TEST TVVEET TEST TVVEET', author: 'Patrick'})
        .expect(200)
        .end(function(err, res){
          tvveetId = res.body.id;
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('Success');
          res.body.Success.should.equal(true);
          res.body.should.have.property('id');
          done();
        });
    })

    it('should respond with the correct tvveet object on POST /tvveets/delete', function(done){
      console.log(tvveetId);
      server
        .post('/tvveets/delete')
        .send({id: tvveetId})
        .expect(200)
        .end(function(err, res) {
          done();
        });
    });

    it('should logout the user on POST /logout', function(done){
      // Is there any reason the logout test isn't last?
      // I could imagine that it's because you want to make sure the GET /users and GET /tvveets
      // routes are available even if you're not logged in -- if so, document with a comment?
      // (or ideally, probably run the "same" test both for logged-in users and for logged-out users to
      // make sure it doesn't *only* work in the logged-out case)
      server
        .post('/logout')
        .expect(302)
        .expect('Location', '/login')
        .end(function(err, res){
          if (err) return done(err);
          return done();
        });
    });

    it('should respond with a list of all users on GET /users', function(done){
      server
        .get('/users')
        .expect(200)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('Success');
          res.body.Success.should.equal(true);
          res.body.should.have.property('Users');
          done();
        });
    });

    it('should respond with a list of all tvveets on GET /tvveets', function(done){
      server
        .get('/tvveets')
        .expect(200)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('Success');
          res.body.Success.should.equal(true);
          res.body.should.have.property('Tvveets');
          done();
        })
    })
});


function loginUser() {
  // Nice! I especially appreciate that this is abstracted out -- it's nice to read
  // it("...", loginUser());
  // the way you have it, as opposed to
  // it("...", complicated function);
    return function(done) {
        server
            .post('/login')
            .send({ username: 'Patrick', password: 'Patrick' }) // a maximally-secure password right here :)
            .expect(302)
            .expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};
