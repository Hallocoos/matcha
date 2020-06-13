exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id')
    table.string('username')
    table.string('password')
  })
  // .createTable('', function (table) {
  // })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
