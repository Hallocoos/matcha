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
        message: 'I like turtles.',
        receiver: 'Hallocoos',
        sender: 'Jemima'
      });
    })
    .then(async function () {
      return knex('notifications').insert({
        receiveId: '1',
        sendId: '10',
        message: 'I really like food',
        receiver: 'Hallocoos',
        sender: 'Clothild'
      });
    })
    .then(async function () {
      return knex('notifications').insert({
        receiveId: '11',
        sendId: '1',
        message: 'I dont really like food',
        receiver: 'Ingeltrudis',
        sender: 'Hallocoos'
      });
    })
};
