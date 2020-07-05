const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')
const saltRounds = 3

adminName = process.env.ADMINNAME || 'admin'
adminPassword = process.env.ADMINPASSWORD || 'admin'

async function hash(pssword) {
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(pssword, salt)
  return hash
}

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    // Inserts seed entries
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Hallocoos',
          password: await hash('12345678'),
          firstname: 'Kyle',
          lastname: 'the Monster',
          email: 'wdv@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '20',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('Hallocoos')).replace(/\//g, ''),
          longitude: 31.2836,
          latitude: -32.2541,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'asdfasdf',
          password: await hash('asdfasdf'),
          firstname: 'asdfasdf',
          lastname: 'asdfasdf',
          email: 'asdf@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '21',
          countryName: 'asdkjf',
          city: 'zxcvzxc',
          fame: 1000,
          hash: await (await hash('asdfasdf')).replace(/\//g, ''),
          longitude: 17.0401,
          latitude: -32.1827,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'qwerqwer',
          password: await hash('qwerqwer'),
          firstname: 'qwerqwer',
          lastname: 'qwerqwer',
          email: 'qwer@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '22',
          countryName: 'wevfqevf',
          city: 'wevfqwevfq',
          fame: 1,
          hash: await (await hash('qwerqwer')).replace(/\//g, ''),
          longitude: 73.3947,
          latitude: -84.4936,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'wertwert',
          password: await hash('wertwert'),
          firstname: 'wertwert',
          lastname: 'wertwert',
          email: 'wert@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '22',
          countryName: 'wevfqevf',
          city: 'wevfqwevfq',
          fame: 0,
          hash: await (await hash('wertwert')).replace(/\//g, ''),
          longitude: 73.3947,
          latitude: -84.4936,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'zxcvzxcv',
          password: await hash('zxcvzxcv'),
          firstname: 'zxcvzxcv',
          lastname: 'zxcvzxcv',
          email: 'zxcv@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '20',
          countryName: 'wevfqwevf',
          city: 'wevfqwevfq',
          fame: 0,
          hash: await (await hash('zxcvzxcv')).replace(/\//g, ''),
          longitude: 25.3639,
          latitude: -15.3658,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'uiop',
          password: await hash('uiop'),
          firstname: 'uiop',
          lastname: 'uiop',
          email: 'uiop@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '20',
          countryName: 'uiop',
          city: 'uiop',
          fame: 0,
          hash: await (await hash('Hallocoos')).replace(/\//g, ''),
          longitude: 85.3654,
          latitude: -75.3654,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'sdfgsdfg',
          password: await hash('sdfgsdfg'),
          firstname: 'sdfgsdf',
          lastname: 'sdfgsdfg',
          email: 'sdfg@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '21',
          countryName: 'sdfgsdfg',
          city: 'sdfgsdfg',
          fame: 110,
          hash: await (await hash('sdfgsdfg')).replace(/\//g, ''),
          longitude: 17.0401,
          latitude: -32.1827,
          matchable: 1,
          verified: 1
        });
    })
};