var express = require('express');
var router = express.Router();
var bookQueries = require('../queries/bookQueries');
var bookList = require('./bookRoutes/bookList');

router.get('/', function(req, res, next) {
  return bookQueries.bookCount(req, res, next)
  .then(function(data) {
    res.render('bookViews/bookList', {bookCount: data[0].count});
  });
});

router.get('/all', function(req, res, next) {
  return bookList(req, res, next)
  .then(function(data) {
    res.status(200).send(data);
  });
});

module.exports = router;
