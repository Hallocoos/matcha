exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary()
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email').notNullable()
      table.string('gender').notNullable()
      table.string('interest').notNullable()
      table.string('age').notNullable()
      table.string('tags').notNullable()
      table.string('ip').defaultTo('')
      table.string('countryName').defaultTo('')
      table.string('regionName').defaultTo('')
      table.string('city').defaultTo('')
      table.string('zipcode').defaultTo('')
      table.boolean('verified').defaultTo(false)
      table.integer('fameRating').defaultTo(0)
      table.string('hash').notNullable()
    })
    .createTable('images', function (table) {
      table.increments('id').primary()
      table.string('image').notNullable()
      table.boolean('profilePicture').defaultTo(false)
      table.integer('userId').unsigned().references('id').inTable('users')
    })
    .createTable('matches', function (table) {
      table.increments('id').primary()
      table.integer('acceptId').unsigned().references('id').inTable('users')
      table.integer('requestId').unsigned().references('id').inTable('users')
      table.boolean('accepted').defaultTo(false)
      table.boolean('blocked').defaultTo(false)
    }).then();
};

exports.down = function (knex, Promise) {
  return knex.schema
  .dropTable('matches')
  .dropTable('images')
  .dropTable('users').then();
};
