const dotenv = require('dotenv').config()

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
  // Inserts seed entries
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 1,
      image: "asdfasdfqerhhenrtnhrtwerqwer",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 4,
      image: "asdfaseqwwevfqveqfevqfdfqwerqwer",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 4,
      image: "evevfqfqvevqefqv",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 3,
      image: "asdfasdfvq  wefvwevqfqwerqwer",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 3,
      image: "asdfasd           fqwerqwer",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 1,
      image: "asdfa222222222222222sdfqwerqwer",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 1,
      image: "asdfaggggggggggggsdfqwerqwer",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 2,
      image: "asdfzzzzzzzzzzzzzasdfqwerqwer",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: false,
      userId: 2,
      image: "asdfafgfffffffffffffffsdfqwerqwer",
    });
  })
  .then(async function () {
    return knex('images').insert({
      profilePicture: true,
      userId: 2,
      image: "asdfasdfhhhhhhhhhhhhhhhhqwerqwer",
    });
  });
};
