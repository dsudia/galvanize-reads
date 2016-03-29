var knex = require('../../../db/knex');

module.exports = {

  authorsByBook: function() {
    return knex('authors').select('authors.first_name',
    'authors.last_name',
    'author_book_rels.book_id')
    .join('author_book_rels', 'authors.id', 'author_book_rels.author_id');
  },

  allAuthors: function() {
    return knex('authors').
    orderBy('last_name', 'asc');
  },

  authorCount: function() {
    return knex('authors').count();
  },

  authorsByGenre: function(genre) {
    return knex('authors').select('authors.first_name',
    'authors.last_name',
    'author_book_rels.book_id',
    'books.genre')
    .join('author_book_rels', 'authors.id', 'author_book_rels.author_id')
    .join('books', 'books.id', 'author_book_rels.book_id')
    .where('books.genre', genre);
  },

  authorSearch: function(searchString) {
    return knex('authors').where('first_name', 'like', '%' + searchString + '%')
    .orWhere('last_name', 'like', '%' + searchString + '%');
  },

  oneAuthor: function(id) {
    return knex('authors').where('id', id);
  }

};
