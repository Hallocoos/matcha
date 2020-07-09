const dotenv = require('dotenv').config()

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notifications').del()
      // Inserts seed entries
      .then(async function () {
        return knex('notifications').insert({
          receiveId: '8',
          sendId: '1',
          message: 'I really like food',
          receiver: 'Atula',
          sender: 'Hallocoos'
        });
      })
      .then(async function () {
        return knex('notifications').insert({
          receiveId: '1',
          sendId: '9',
          message: 'I really like food',
          receiver: 'Hallocoos',
          sender: 'Jemima'
        });
      })
      .then(async function () {
        return knex('notifications').insert({
          receiveId: '1',
          sendId: '14',
          message: 'I like turtles.',
          receiver: 'Hallocoos',
          sender: 'Theodraded'
        });
      })
      .then(async function () {
        return knex('notifications').insert({
          receiveId: '16',
          sendId: '17',
          message: 'I dont really like food',
          receiver: 'Eulimenei',
          sender: 'Eriphia'
        });
      })
      .then(async function () {
        return knex('notifications').insert({
          receiveId: '24',
          sendId: '23',
          message: 'I dont really like food',
          receiver: 'Ingeltrudis',
          sender: 'Mariphine'
        });
      })
      .then(async function () {
        return knex('notifications').insert({
          receiveId: '25',
          sendId: '26',
          message: 'I dont really like food',
          receiver: 'Acotali',
          sender: 'Bromia'
        });
      })
};
