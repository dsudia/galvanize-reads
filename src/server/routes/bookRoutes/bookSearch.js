var bookQueries = require('../../queries/bookQueries');
var authorQueries = require('../../queries/authorQueries');

module.exports = function(searchString) {
  var tableData = {
    bookData: [],
    authorData: []
  };
  return bookQueries.bookSearch(searchString)
  .then(function(data) {
    return data.forEach(function(el, ind, arr) {
      tableData.bookData.push(el);
    });
  })
  .then(function() {
    return authorQueries.allAuthors()
    .then(function(data) {
      return data.forEach(function(el, ind, arr) {
        tableData.authorData.push(el);
      });
    });
  })
  .then(function() {
    return tableData;
  });
};
