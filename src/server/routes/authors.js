var express = require('express');
var router = express.Router();
var authorList = require('./authorRoutes/authorList');

router.get('/', function(req, res, next) {
  return authorList(req, res, next);
});

module.exports = router;
