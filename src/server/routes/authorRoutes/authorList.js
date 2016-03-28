var bookQueries = require('../../queries/bookQueries');
var authorQueries = require('../../queries/authorQueries');

module.exports = function(req, res, next) {
  var bookData;
  var authorData;
  return authorQueries.allAuthors()
  .then(function(data) {
    authorData = data;
  })
  .then(function() {
    return booksQueries.booksByAuthor()
    .then(function(data) {
      bookData = data;
    });
  })
  .then(function() {
    res.render('bookViews/bookList', {books: bookData, authors: authorData});
  });
};
