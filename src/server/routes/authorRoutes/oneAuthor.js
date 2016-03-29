var bookQueries = require('../../queries/bookQueries');
var authorQueries = require('../../queries/authorQueries');

module.exports = function(id) {
  var tableData = {
    bookData: [],
    authorData: []
  };
  return bookQueries.booksByAuthor()
  .then(function(data) {
    return data.forEach(function(el, ind, arr) {
      tableData.bookData.push(el);
    });
  })
  .then(function() {
    return authorQueries.oneAuthor(id)
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
