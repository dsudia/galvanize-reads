var knex = require('../../../db/knex');

module.exports = {

  allBooks: function() {
    return knex('books')
    .orderBy('title', 'asc');
  },

  booksByAuthor: function() {
    return knex('books')
    .select('books.title', 'author_book_rels.author_id')
    .orderBy('books.title');
  }


};
