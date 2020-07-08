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
};
