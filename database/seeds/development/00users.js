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
          ip: '192.168.0.1',
          countryName: 'South Africa',
          regionName: 'Western Cape',
          city: 'Cape Town',
          zipcode: '7441',
          fameRating: 0,
          hash:  await hash('Hallocoos')
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
          ip: '156.256.36.134',
          countryName: 'asdkjf',
          regionName: 'qwerqwe',
          city: 'zxcvzxc',
          zipcode: '2345',
          fameRating: 0,
          hash: await (await hash('asdfasdf')).replace('/', '')
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
          ip: '123.456.789.32',
          countryName: 'wevfqevf',
          regionName: 'b5ynuj7',
          city: 'wevfqwevfq',
          zipcode: '8842',
          fameRating: 0,
          hash: await hash('qwerqwer')
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
          tags: 'balls',
          ip: '156.654.45.65',
          countryName: 'wevfqwevf',
          regionName: 'wevfqwefqv',
          city: 'wevfqwevfq',
          zipcode: '9814',
          fameRating: 0,
          hash: await hash('zxcvzxcv')
        });
    })
};

// Template for new user:
// username: '',
// password: '',
// firstname: '',
// lastname: '',
// email: '',
// gender: '',
// interest: '',
// age: '',
// ip: '',
// countryName: '',
// regionName: '',
// city: '',
// zip: ''