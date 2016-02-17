var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var tvveets = require('./routes/tvveets');
var login = require('./routes/login');
var auth = require('./routes/auth');
var logout = require('./routes/logout');


var User = require('./models/user.js');

mongoose.connect('mongodb://patrick:olinjs@ds031922.mongolab.com:31922/tvvitter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ 
  secret: 'super secretive secret',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/tvveets', tvveets);
app.use('/login', login);
app.use('/logout', logout);
app.use('/auth', auth);

// Passport Local config
passport.use(new LocalStrategy(
  function(username, password, cb) {

    var newUser = {
      username: username,
      password: password
    };

    User.findOneAndUpdate({username: username}, {$setOnInsert : newUser}, {upsert: true}, function(err, user){
      if (err) { return cb(err); }
      if (!user) { return cb(null, newUser.username); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user.username);
    });
  }));

// Passport Facebook config
passport.use(new FacebookStrategy({
  clientID: config.facebook.facebookID,
  clientSecret: config.facebook.facebookSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var username = profile.displayName.split(" ")[0];
    console.log(username);
    done(null, username);
  }
));

// Passport serialization
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
