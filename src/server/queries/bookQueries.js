var knex = require('../../../db/knex');

module.exports = {

  allBooks: function() {
    return knex('books')
    .orderBy('title', 'asc');
  },

  booksByAuthor: function() {
    return knex('books')
    .select('books.title', 'author_book_rels.author_id', 'books.id')
    .join('author_book_rels', 'books.id', 'author_book_rels.book_id');
  },

  bookCount: function() {
    return knex('books').count();
  },

  genreList: function() {
    return knex('books').select('genre').groupBy('genre');
  },

  booksByGenre: function(genre) {
    return knex('books').where('genre', genre)
    .orderBy('title', 'asc');
  },

  bookSearch: function(searchString) {
    return knex('books').where('title', 'like', '%' + searchString + '%');
  },

  oneBook: function(id) {
    return knex('books').where('id', id);
  }


};
