var bookQueries = require('../../queries/bookQueries');
var authorQueries = require('../../queries/authorQueries');

module.exports = function(req, res, next) {
  var bookData;
  var authorData;
  var authorCount;
  return authorQueries.allAuthors()
  .then(function(data) {
    authorData = data;
  })
  .then(function() {
    return bookQueries.booksByAuthor()
    .then(function(data) {
      bookData = data;
    });
  })
  .then(function() {
    return authorQueries.authorCount()
    .then(function(data) {
      authorCount = data[0].count;
    });
  })
  .then(function() {
    res.render('authorViews/authorList', {books: bookData, authors: authorData, authorCount: authorCount});
  });
};
