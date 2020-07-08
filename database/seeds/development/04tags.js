const dotenv = require('dotenv').config()

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    // Inserts seed entries
    .then(async function () {
      return knex('tags').insert({
        userId: 1,
        tag: 'food'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 1,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 1,
        tag: 'asdf'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 1,
        tag: 'zxcv'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 2,
        tag: 'food'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 2,
        tag: 'vegan'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 2,
        tag: 'zxcv'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 2,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 3,
        tag: 'vegan'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 3,
        tag: 'asdf'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 3,
        tag: 'zxcv'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 3,
        tag: 'lkhj'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 4,
        tag: 'meat'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 4,
        tag: 'zxcv'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 4,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 4,
        tag: 'asdf'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 5,
        tag: 'meat'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 5,
        tag: 'vegan'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 5,
        tag: 'food'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 5,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 6,
        tag: 'asdf'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 6,
        tag: 'food'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 6,
        tag: 'vegan'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 6,
        tag: 'dota'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 6,
        tag: 'reef'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 7,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 7,
        tag: 'vegan'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 7,
        tag: 'zxcv'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 7,
        tag: 'icicles'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 7,
        tag: 'bored'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 8,
        tag: 'bored'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 8,
        tag: 'asdf'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 8,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 8,
        tag: 'zxcv'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 8,
        tag: 'meat'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 9,
        tag: 'wert'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 9,
        tag: 'sdfg'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 9,
        tag: 'xcvb'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 9,
        tag: 'fdas'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 9,
        tag: 'reqw'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 10,
        tag: 'reqw'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 10,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 10,
        tag: 'dfj'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 10,
        tag: 're23bg3gqw'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 10,
        tag: 'mtuymk'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 11,
        tag: 'asdf'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 11,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 11,
        tag: 'zxcv'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 11,
        tag: '46i7im'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 11,
        tag: '2b34bt'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 12,
        tag: '2b34bt'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 12,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 12,
        tag: 'meat'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 12,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 12,
        tag: 'rtnuytn'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 13,
        tag: 'food'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 13,
        tag: 'meat'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 13,
        tag: 'vegan'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 13,
        tag: 'reef'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 13,
        tag: 'bored'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 14,
        tag: 'bored'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 14,
        tag: 'qwer'
      });
    })
    .then(async function () {
      return knex('tags').insert({
        userId: 14,
        tag: 'asdf'
      });
    })
};
