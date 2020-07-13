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
        sender: 'Hallocoos',
        isChat: true
      });
    })
    .then(async function () {
      return knex('notifications').insert({
        receiveId: '1',
        sendId: '9',
        message: 'I like turtles.',
        receiver: 'Hallocoos',
        sender: 'Jemima',
        isChat: true
      });
    })
    .then(async function () {
      return knex('notifications').insert({
        receiveId: '1',
        sendId: '10',
        message: 'I really like food',
        receiver: 'Hallocoos',
        sender: 'Clothild',
        isChat: true
      });
    })
    .then(async function () {
      return knex('notifications').insert({
        receiveId: '11',
        sendId: '1',
        message: 'I dont really like food',
        receiver: 'Ingeltrudis',
        sender: 'Hallocoos',
        isChat: true
      });
    })
};
