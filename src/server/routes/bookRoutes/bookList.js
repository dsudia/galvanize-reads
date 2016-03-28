var bookQueries = require('../../queries/bookQueries');
var authorQueries = require('../../queries/authorQueries');

module.exports = function(req, res, next) {
  var bookData;
  var authorData;
  var bookCount;
  return bookQueries.allBooks()
  .then(function(data) {
    bookData = data;
  })
  .then(function() {
    return authorQueries.authorsByBook()
    .then(function(data) {
      authorData = data;
    });
  })
  .then(function() {
    return bookQueries.bookCount()
    .then(function(data) {
      bookCount = data[0].count;
    });
  })
  .then(function() {
    res.render('bookViews/bookList', {books: bookData, authors: authorData, bookCount: bookCount});
  });
};
