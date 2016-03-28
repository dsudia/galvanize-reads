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
  }

};
