var express = require('express');
var router = express.Router();
var bookQueries = require('../queries/bookQueries');
var bookList = require('./bookRoutes/bookList');
var booksByGenre = require('./bookRoutes/booksByGenre');

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

router.get('/:genre', function(req, res, next) {
  var genre = req.params.genre;
  return booksByGenre(genre)
  .then(function(data) {
    res.status(200).send(data);
  });
});

module.exports = router;
