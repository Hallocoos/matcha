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
          tags: 'some',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
           hash: await (await hash('Hallocoos')).replace('/', ''),
          longitude: 31.2836,
          latitude: -32.2541
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
          tags: 'food',
          countryName: 'asdkjf',
          city: 'zxcvzxc',
          fame: 0,
          hash: await await (await hash('asdfasdf')).replace('/', ''),
          longitude: 17.0401,
          latitude: -32.1827
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
          tags: 'sucks',
          countryName: 'wevfqevf',
          city: 'wevfqwevfq',
          fame: 0,
          hash: await (await hash('qwerqwer')).replace('/', ''),
          longitude: 73.3947,
          latitude: -84.4936
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'zxcvzxcv',
          password: (await hash('zxcvzxcv')).replace('/', ''),
          firstname: 'zxcvzxcv',
          lastname: 'zxcvzxcv',
          email: 'zxcv@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '20',
          tags: 'balls',
          countryName: 'wevfqwevf',
          city: 'wevfqwevfq',
          fame: 0,
          hash: await (await hash('zxcvzxcv')).replace('/', ''),
          longitude: 25.3639,
          latitude: -15.3658
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
          tags: 'balls',
          countryName: 'uiop',
          city: 'uiop',
          fame: 0,
          hash: await (await hash('uiop')).replace('/', ''),
          longitude: 85.3654,
          latitude: -75.3654
        });
    })
};