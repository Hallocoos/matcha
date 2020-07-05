exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary()
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email').notNullable()
      table.string('age').notNullable()
      table.string('gender').defaultTo('')
      table.string('biography').defaultTo('')
      table.string('interest').defaultTo('')
      table.string('tags').defaultTo('')
      table.string('countryName').defaultTo('')
      table.string('city').defaultTo('')
      table.string('longitude').defaultTo('')
      table.string('latitude').defaultTo('')
      table.boolean('verified').defaultTo(false)
      table.integer('fame').defaultTo(0)
      table.string('hash').notNullable()
      table.boolean('locationTracking').defaultTo(true)
    })
    .createTable('images', function (table) {
      table.increments('id').primary()
      table.text('image','longtext').notNullable()
      table.boolean('profilePicture').defaultTo(false)
      table.integer('userId').unsigned().references('id').inTable('users')
    })
    .createTable('matches', function (table) {
      table.increments('id').primary()
      table.integer('acceptId').unsigned().references('id').inTable('users')
      table.integer('requestId').unsigned().references('id').inTable('users')
      table.string('accepter').notNullable()
      table.string('requester').notNullable()
      table.boolean('accepted').defaultTo(false)
      table.boolean('blocked').defaultTo(false)
    })
    .createTable('notifications', function (table) {
      table.increments('id').primary()
      table.integer('sendId').unsigned().references('id').inTable('users')
      table.integer('receiveId').unsigned().references('id').inTable('users')
      table.string('sender').notNullable()
      table.string('receiver').notNullable()
      table.string('message').notNullable()
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.boolean('seen').defaultTo(false)
    })
    .createTable('tags', function (table) {
      table.increments('id').primary()
      table.integer('userId').unsigned().references('id').inTable('users')
      table.string('tag').notNullable()
    }).then();
};

exports.down = function (knex, Promise) {
  return knex.schema
  .dropTable('tags')
  .dropTable('notifications')
  .dropTable('matches')
  .dropTable('images')
  .dropTable('users').then();
};
