var express = require('express');
var router = express.Router();
var authorList = require('./authorRoutes/authorList');
var authorQueries = require('../queries/authorQueries');

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

module.exports = router;
