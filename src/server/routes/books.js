var express = require('express');
var router = express.Router();
var bookQueries = require('../queries/bookQueries');
var bookList = require('./bookRoutes/bookList');
var booksByGenre = require('./bookRoutes/booksByGenre');
var oneBook = require('./bookRoutes/oneBook');


router.get('/all', function(req, res, next) {
  return bookList(req, res, next)
  .then(function(data) {
    res.status(200).send(data);
  });
});

router.get('/genres/:genre', function(req, res, next) {
  var genre = req.params.genre;
  return booksByGenre(genre)
  .then(function(data) {
    res.status(200).send(data);
  });
});

router.get('/:id', function(req, res, next) {
  var id = Number(req.params.id);
  return oneBook(id)
  .then(function(data) {
    res.status(200).send(data);
  });
});

module.exports = router;
