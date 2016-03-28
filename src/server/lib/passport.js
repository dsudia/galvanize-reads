var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../../../db/knex');
var helpers = require('./helpers');


passport.use(new LocalStrategy({
},
  function(username, password, done) {
    knex('users').where('username', username)
      .then(function(data) {
        var user = data[0];
        console.log(user);
        helpers.checkPassword(password, user.password)
          .then(function() {
            return done(null, user, {message: 'You\'re logged in!'});
          })
          .catch(function(err) {
            return done(null, false, {message: 'Incorrect password.'});
          });
        }).catch(function(err) {
          return done(null, false, {message: 'Incorrect username.'});
        });
  }
));


// *** configure passport *** //
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  knex('users').where('id', id)
    .then(function(data) {
      return done(null, data[0]);
    }).catch(function(err) {
      return done(err, null);
    });
});

module.exports = passport;
