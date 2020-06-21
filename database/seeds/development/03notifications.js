const dotenv = require('dotenv').config()

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notifications').del()
  // Inserts seed entries
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '1',
      sendId: '2',
      message: 'I really like food',
      receiver: 'Hallocoos',
      sender: 'asdfasdf'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '2',
      sendId: '1',
      message: 'I dont really like food',
      receiver: 'asdfasdf',
      sender: 'Hallocoos'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '1',
      sendId: '3',
      message: 'I really like food',
      receiver: 'Hallocoos',
      sender: 'qwerqwer'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '3',
      sendId: '1',
      message: 'I dont really like food',
      receiver: 'qwerqwer',
      sender: 'Hallocoos'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '1',
      sendId: '4',
      message: 'I really like food',
      receiver: 'Hallocoos',
      sender: 'zxcvzxcv'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '4',
      sendId: '1',
      message: 'I dont really like food',
      receiver: 'zxcvzxcv',
      sender: 'Hallocoos'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '2',
      sendId: '3',
      message: 'I really like food',
      receiver: 'asdfasdf',
      sender: 'qwerqwer'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '3',
      sendId: '2',
      message: 'I dont really like food',
      receiver: 'qwerqwer',
      sender: 'asdfasdf'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '2',
      sendId: '4',
      message: 'I really like food',
      receiver: 'asdfasdf',
      sender: 'zxcvzxcv'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '4',
      sendId: '2',
      message: 'I dont really like food',
      receiver: 'zxcvzxcv',
      sender: 'asdfasdf'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '3',
      sendId: '4',
      message: 'I really like food',
      receiver: 'qwerqwer',
      sender: 'zxcvzxcv'
    });
  })
  .then(async function () {
    return knex('notifications').insert({
      receiveId: '4',
      sendId: '3',
      message: 'I dont really like food',
      receiver: 'zxcvzxcv',
      sender: 'qwerqwer'
    });
  });
};
