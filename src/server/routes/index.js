var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var helpers = require('../lib/helpers');

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
