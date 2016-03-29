var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var helpers = require('../lib/helpers');
var bookQueries = require('../queries/bookQueries');
var authorQueries = require('../queries/authorQueries');

router.get('/', function(req, res, next) {
  return bookQueries.genreList()
  .then(function(data) {
    res.render('index', {user: req.user, genreList: data});
  });
});

router.get('/search', function(req, res, next) {
  var searchString = req.query.search;
  var tableData = {
    bookData: [],
    authorData: []
  };
  return authorQueries.authorSearch(searchString)
  .then(function(data) {
    if (data[0] !== undefined) {
      return data.forEach(function(el, ind, arr) {
        tableData.authorData.push(el);
      });
    }
  })
  .then(function() {
    return bookQueries.bookSearch(searchString);
  })
  .then(function(data) {
    if (data[0] !== undefined) {
      return data.forEach(function(el, ind, arr) {
        tableData.bookData.push(el);
      });
    }
  })
  .then(function() {
    res.status(200).send(tableData);
  });
});

module.exports = router;
