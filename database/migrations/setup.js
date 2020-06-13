exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('username')
    table.string('password')
    table.string('firstname')
    table.string('lastname')
    table.string('email')
    table.string('gender')
    table.string('interest')
    table.integer('age')
    table.string('tags')
    table.string('ip')
    table.string('countryName')
    table.string('regionName')
    table.string('city')
    table.string('zipcode')
    table.boolean('verified')
  })
  .createTable('images', function (table) {
    table.increments('id')
    table.string('userId')
    table.string('image')
    table.boolean('profilePicture')
  })
  .createTable('matches', function (table) {
    table.string('acceptUserId')
    table.string('requestUserId')
    table.boolean('accepted')
    table.boolean('blocked')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').
  knex.schema.dropTable('images').
  knex.schema.dropTable('matches');
};
