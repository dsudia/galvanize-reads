var knex = require('../../../db/knex');

module.exports = {

  allBooks: function() {
    return knex('books').select('id',
    'title',
    'genre',
    'description',
    'image_url')
    .orderBy('title', 'asc');
  }


};
