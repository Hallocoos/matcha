const dotenv = require('dotenv').config()

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('matches').del()
    // Inserts seed entries
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 8,
          requestId: 1,
          accepter: 'Atula',
          requester: 'Hallocoos',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 1,
          requestId: 9,
          accepter: 'Hallocoos',
          requester: 'Jemima',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 1,
          requestId: 10,
          accepter: 'Hallocoos',
          requester: 'Clothild',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 11,
          requestId: 1,
          accepter: 'Ingeltrudis',
          requester: 'Hallocoos',
          accepted: true,
          blocked: true,
        });
    })
};
