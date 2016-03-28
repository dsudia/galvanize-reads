
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name');
    table.string('password');
    table.string('user_type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
