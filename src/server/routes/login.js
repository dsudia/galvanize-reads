var express = require('express');
var router = express.Router();
var helpers = require('../lib/helpers');
var passport = require('../lib/passport');

router.get('/', helpers.loginRedirect, function(req, res, next) {
  res.render('login');
});

router.post('/', passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res, next) {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
