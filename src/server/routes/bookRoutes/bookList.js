var bookQueries = require('../../queries/bookQueries');
var authorQueries = require('../../queries/authorQueries');

module.exports = function(req, res, next) {
  var bookData;
  var authorData;
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
    res.render('bookViews/bookList', {books: bookData, authors: authorData});
  });
};
