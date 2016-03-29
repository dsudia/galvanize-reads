var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var helpers = require('../lib/helpers');
var bookQueries = require('../queries/bookQueries');

router.get('/', function(req, res, next) {
  return bookQueries.genreList()
  .then(function(data) {
    res.render('index', {user: req.user, genreList: data});
  });
});

module.exports = router;
