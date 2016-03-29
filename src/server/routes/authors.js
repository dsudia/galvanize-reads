var express = require('express');
var router = express.Router();
var authorList = require('./authorRoutes/authorList');
var authorQueries = require('../queries/authorQueries');
var oneAuthor = require('./authorRoutes/oneAuthor');


router.get('/all', function(req, res, next) {
  return authorList(req, res, next)
  .then(function(data) {
    console.log(data);
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
