var bookQueries = require('../../queries/bookQueries');
var authorQueries = require('../../queries/authorQueries');

module.exports = function(req, res, next) {
  var tableData = {
    bookData: [],
    authorData: []
  };
  var bookData;
  var authorData;
  return authorQueries.allAuthors()
  .then(function(data) {
    return data.forEach(function(el, ind, arr) {
      tableData.authorData.push(el);
    });
  })
  .then(function() {
    return bookQueries.booksByAuthor()
    .then(function(data) {
      return data.forEach(function(el, ind, arr) {
        tableData.bookData.push(el);
      });
    });
  })
  .then(function() {
    return tableData;
  });
};
