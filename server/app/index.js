'use strict';

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session')
var passport = require('passport');
// don't forget to install passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));

//session middleware
app.use(session({
  secret: 'thisIsASeeeeeeeecret'
}))

app.use(function (req, res, next) {
  console.log('session', req.session);
  console.log('session id', req.sessionID);
  next();
});

//passport middleware
app.use(passport.initialize());
app.use(passport.session());



passport.use(
  new GoogleStrategy({
    clientID: '936274985985-v06rpii5thtsacnn4hcaon0bbhbgmmde.apps.googleusercontent.com',
    clientSecret: 'E9YiD-BCnSJHQaOZFvBfgFWR',
    callbackURL: '/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---

    */
    //google ID is contained in profile.id
    console.log('---', 'in verification callback', profile, '---');
    const profileInfo = {
      name: profile.displayName,
      photo: profile.photos ? profile.photos[0].value : undefined,
      email: profile.emails[0].value
    }
    User.findOrCreate(
                      {where: {googleId: profile.id},
                      defaults: profileInfo})
    .spread((user) => {
      done(null, user);
    })
    .catch(done)

  })
);

// Google authentication and login
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/users', // or wherever
    failureRedirect : '/' // or wherever
  })
);

app.use('/api', require('../api/api.router'));

app.get('/auth/me', function (req, res, next) {
  const userId = req.session.userId
  User.findById(userId)
  .then((user) => res.json(user))
  .catch(next);
} )

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
