var express = require('express');
var router = express.Router();
var bookQueries = require('../queries/bookQueries');
var bookList = require('./bookRoutes/bookList');
var booksByGenre = require('./bookRoutes/booksByGenre');
var bookSearch = require('./bookRoutes/bookSearch');
var oneBook = require('./bookRoutes/oneBook');

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

router.get('/search', function(req, res, next) {
  console.log('this is being hit');
  var searchString = req.query.search;
  return bookSearch(searchString)
  .then(function(data) {
    res.status(200).send(data);
  });
});

router.get('/:param', function(req, res, next) {
  if (typeof req.params.param === 'number') {
    var id = req.params.param;
    return oneBook(id)
    .then(function(data) {
      res.status(200).send(data);
    });
  } else {
    var genre = req.params.param;
    return booksByGenre(genre)
    .then(function(data) {
      res.status(200).send(data);
    });
  }
});

module.exports = router;
