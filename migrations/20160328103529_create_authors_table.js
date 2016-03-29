
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table) {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.text('bio');
    table.string('auth_img');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
