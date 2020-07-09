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
                acceptId: 14,
                requestId: 1,
                accepter: 'Hallocoos',
                requester: 'Theodraded',
                accepted: false,
                blocked: false,
            });
    })
    .then(async function () {
        return knex('matches')
            .insert({
                acceptId: 16,
                requestId: 17,
                accepter: 'Eulimenei',
                requester: 'Eriphia',
                accepted: true,
                blocked: false,
            });
    })
      .then(async function () {
          return knex('matches')
              .insert({
                  acceptId: 24,
                  requestId: 23,
                  accepter: 'Ingeltrudis',
                  requester: 'Mariphine',
                  accepted: true,
                  blocked: false,
              });
      })
      .then(async function () {
          return knex('matches')
              .insert({
                  acceptId: 25,
                  requestId: 26,
                  accepter: 'Acotali',
                  requester: 'Bromia',
                  accepted: true,
                  blocked: false,
              });
      })
};
