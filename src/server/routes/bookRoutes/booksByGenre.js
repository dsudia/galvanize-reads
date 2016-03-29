var bookQueries = require('../../queries/bookQueries');
var authorQueries = require('../../queries/authorQueries');

module.exports = function(genre) {
  var tableData = {
    bookData: [],
    authorData: []
  };
  return bookQueries.booksByGenre(genre)
  .then(function(data) {
    return data.forEach(function(el, ind, arr) {
      tableData.bookData.push(el);
    });
  })
  .then(function() {
    return authorQueries.authorsByGenre(genre)
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
