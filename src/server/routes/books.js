var express = require('express');
var router = express.Router();
var bookQueries = require('../queries/bookQueries');
var bookList = require('./bookRoutes/bookList');

router.get('/', function(req, res, next) {
  var bookCount;
  return bookQueries.bookCount(req, res, next)
  .then(function(data) {
    bookCount = data[0].count;
  })
  .then(function() {
    return bookQueries.genreList();
  })
  .then(function(data) {
    res.render('bookViews/bookList', {bookCount: bookCount, genreList: data});
  });
});

router.get('/all', function(req, res, next) {
  return bookList(req, res, next)
  .then(function(data) {
    res.status(200).send(data);
  });
});

module.exports = router;
