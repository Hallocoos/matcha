const dotenv = require('dotenv').config()

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('matches').del()
    // Inserts seed entries
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 3,
          requestId: 1,
          accepter: 'qwerqwer',
          requester: 'Hallocoos',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 1,
          requestId: 2,
          accepter: 'Hallocoos',
          requester: 'asdfasdf',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 2,
          accepter: 'zxcvzxcv',
          requester: 'asdfasdf',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 1,
          accepter: 'zxcvzxcv',
          requester: 'Hallocoos',
          accepted: true,
          blocked: true,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 2,
          requestId: 3,
          accepter: 'asdfasdf',
          requester: 'qwerqwer',
          accepted: true,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 3,
          accepter: 'zxcvzxcv',
          requester: 'qwerqwer',
          accepted: true,
          blocked: false,
        });
    })
};
