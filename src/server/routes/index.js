var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var helpers = require('../lib/helpers');

router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', {user: req.user});
});

module.exports = router;
