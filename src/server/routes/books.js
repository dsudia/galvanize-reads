var express = require('express');
var router = express.Router();
var bookList = require('./bookRoutes/bookList');

router.get('/', function(req, res, next) {
  return bookList(req, res, next);
});


module.exports = router;
