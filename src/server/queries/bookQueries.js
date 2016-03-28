var knex = require('../../../db/knex');

module.exports = {

  allBooks: function() {
    return knex('books')
    .orderBy('title', 'asc');
  },

  booksByAuthor: function() {
    return knex('books')
    .select('books.title', 'author_book_rels.author_id')
    .join('author_book_rels', 'books.id', 'author_book_rels.book_id');
  },

  bookCount: function() {
    return knex('books').count();
  }


};
