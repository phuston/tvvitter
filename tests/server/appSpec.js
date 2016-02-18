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
      server
        .post('/tvveets/delete')
        .send({id: tvveetId})
    })
});


function loginUser() {
    return function(done) {
        server
            .post('/login')
            .send({ username: 'Patrick', password: 'Patrick' })
            .expect(302)
            .expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};