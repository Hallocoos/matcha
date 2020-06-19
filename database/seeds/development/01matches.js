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
          accepted: true,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 2,
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 1,
          accepted: true,
          blocked: true,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 2,
          requestId: 3,
          accepted: true,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 3,
          accepted: true,
          blocked: false,
        });
    })
};
