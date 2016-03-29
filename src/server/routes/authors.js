var express = require('express');
var router = express.Router();
var authorList = require('./authorRoutes/authorList');
var authorQueries = require('../queries/authorQueries');
var authorSearch = require('./authorRoutes/authorSearch');
var oneAuthor = require('./authorRoutes/oneAuthor');

router.get('/', function(req, res, next) {
  var bookCount;
  return authorQueries.authorCount()
  .then(function(data) {
    authorCount = data[0].count;
  })
  .then(function() {
    res.render('authorViews/authorList', {authorCount: authorCount});
  });
});

router.get('/all', function(req, res, next) {
  return authorList(req, res, next)
  .then(function(data) {
    res.status(200).send(data);
  });
});

router.get('/search', function(req, res, next) {
  var searchString = req.query.search;
  return authorSearch(searchString)
  .then(function(data) {
    res.status(200).send(data);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(id);
  return oneAuthor(id)
  .then(function(data) {
    res.status(200).send(data);
  });
});

module.exports = router;
