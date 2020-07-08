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
          accepter: 'rtnjehrtnhnrt',
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
          requester: 'qwvfbfqbfq',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 2,
          accepter: 'gnnntuytnmtn',
          requester: 'qwvfbfqbfq',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 1,
          accepter: 'gnnntuytnmtn',
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
          accepter: 'qwvfbfqbfq',
          requester: 'rtnjehrtnhnrt',
          accepted: true,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 4,
          requestId: 3,
          accepter: 'gnnntuytnmtn',
          requester: 'rtnjehrtnhnrt',
          accepted: true,
          blocked: false,
        });
    }).then(async function () {
      return knex('matches')
        .insert({
          acceptId: 10,
          requestId: 8,
          accepter: 'oiuqnhnuvh',
          requester: 'asdfasdf',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 8,
          requestId: 9,
          accepter: 'asdfasdf',
          requester: 'oiuqvgmhoiuqh',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 11,
          requestId: 9,
          accepter: 'oiuwnhvfiuh',
          requester: 'asdfasdf',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 11,
          requestId: 8,
          accepter: 'oiuwnhvfiuh',
          requester: 'Hallocoos',
          accepted: true,
          blocked: true,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 9,
          requestId: 10,
          accepter: 'asdfasdf',
          requester: 'oiuqnhnuvh',
          accepted: true,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 11,
          requestId: 10,
          accepter: 'oiuwnhvfiuh',
          requester: 'oiuqnhnuvh',
          accepted: true,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 17,
          requestId: 15,
          accepter: 'qwefvbyyb',
          requester: 'wertwert',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 15,
          requestId: 16,
          accepter: 'wertwert',
          requester: 'zxcvzxcv',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 18,
          requestId: 16,
          accepter: 'rnjnjrtrnjt',
          requester: 'zxcvzxcv',
          accepted: false,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 18,
          requestId: 15,
          accepter: 'rnjnjrtrnjt',
          requester: 'wertwert',
          accepted: true,
          blocked: true,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 16,
          requestId: 17,
          accepter: 'zxcvzxcv',
          requester: 'qwefvbyyb',
          accepted: true,
          blocked: false,
        });
    })
    .then(async function () {
      return knex('matches')
        .insert({
          acceptId: 18,
          requestId: 17,
          accepter: 'rnjnjrtrnjt',
          requester: 'qwefvbyyb',
          accepted: true,
          blocked: false,
        });
    })
};
