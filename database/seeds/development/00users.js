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
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'Hallocoos',
    //       password: await hash('12345678'),
    //       firstname: 'Kyle',
    //       lastname: 'the Monster',
    //       email: 'wdv@mailinator.com',
    //       gender: 'male',
    //       interest: 'female',
    //       age: '20',
    //       biography: 'I like to play POE.',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 100,
    //       hash: await (await hash('Hallocoos')).replace(/\//g, ''),
    //       longitude: 2.2126,
    //       latitude: -1.2341,
    //       matchable: 1,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'nwevfqnss',
    //       password: await hash('12345678'),
    //       firstname: 'John',
    //       lastname: 'the Monster',
    //       email: 'nwevfqnss@mailinator.com',
    //       gender: 'male',
    //       interest: 'female',
    //       age: '21',
    //       biography: 'I don\'t like to play POE.',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 0,
    //       hash: await (await hash('nwevfqnss')).replace(/\//g, ''),
    //       longitude: 2.2856,
    //       latitude: -1.7841,
    //       matchable: 0,
    //       verified: 0
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'vqfwevfqwevfq',
    //       password: await hash('vqfwevfqwevfq'),
    //       firstname: 'vqfwevfqwevfq',
    //       lastname: 'vqfwevfqwevfq',
    //       email: 'vqfwevfqwevfq@mailinator.com',
    //       gender: 'male',
    //       interest: 'female',
    //       age: '25',
    //       biography: 'I am vqfwevfqwevfq the Monster.',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 0,
    //       hash: await (await hash('vqfwevfqwevfq')).replace(/\//g, ''),
    //       longitude: 1.2815,
    //       latitude: -2.5941,
    //       matchable: 0,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'asdfasdf',
    //       password: await hash('asdfasdf'),
    //       firstname: 'asdfasdf',
    //       lastname: 'asdfasdf',
    //       email: 'asdfasdf@mailinator.com',
    //       gender: 'female',
    //       interest: 'male',
    //       age: '30',
    //       countryName: 'asdfasdf',
    //       city: 'asdfasdf',
    //       fame: 120,
    //       hash: await (await hash('asdfasdf')).replace(/\//g, ''),
    //       longitude: 1.9576,
    //       latitude: -2.5374,
    //       matchable: 1,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'qwerqwer',
    //       password: await hash('qwerqwer'),
    //       firstname: 'qwerqwer',
    //       lastname: 'qwerqwer',
    //       email: 'qwerqwer@mailinator.com',
    //       gender: 'female',
    //       interest: 'male',
    //       age: '18',
    //       countryName: 'qwerqwer',
    //       city: 'qwerqwer',
    //       fame: 0,
    //       hash: await (await hash('qwerqwer')).replace(/\//g, ''),
    //       longitude: 2.5481,
    //       latitude: -1.6794,
    //       matchable: 0,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'wertwert',
    //       password: await hash('wertwert'),
    //       firstname: 'wertwert',
    //       lastname: 'wertwert',
    //       email: 'wertwert@mailinator.com',
    //       gender: 'female',
    //       interest: 'male',
    //       age: '22',
    //       countryName: 'wertwert',
    //       city: 'wertwert',
    //       fame: 0,
    //       hash: await (await hash('wertwert')).replace(/\//g, ''),
    //       longitude: 1.4563,
    //       latitude: -1.1268,
    //       matchable: 0,
    //       verified: 0
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'zxcvzxcv',
    //       password: await hash('zxcvzxcv'),
    //       firstname: 'zxcvzxcv',
    //       lastname: 'zxcvzxcv',
    //       email: 'zxcvzxcv@mailinator.com',
    //       gender: 'female',
    //       interest: 'female',
    //       age: '25',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 56,
    //       hash: await (await hash('zxcvzxcv')).replace(/\//g, ''),
    //       longitude: 1.3456,
    //       latitude: -2.1374,
    //       matchable: 1,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'uiop',
    //       password: await hash('uiop'),
    //       firstname: 'uiop',
    //       lastname: 'uiop',
    //       email: 'uiop@mailinator.com',
    //       gender: 'female',
    //       interest: 'female',
    //       age: '20',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 0,
    //       hash: await (await hash('uiop')).replace(/\//g, ''),
    //       longitude: 1.9658,
    //       latitude: -1.9234,
    //       matchable: 0,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'sdfgsdfg',
    //       password: await hash('sdfgsdfg'),
    //       firstname: 'sdfgsdfg',
    //       lastname: 'sdfgsdfg',
    //       email: 'sdfgsdfg@mailinator.com',
    //       gender: 'female',
    //       interest: 'female',
    //       age: '21',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 110,
    //       hash: await (await hash('sdfgsdfg')).replace(/\//g, ''),
    //       longitude: 2.3564,
    //       latitude: -2.1524,
    //       matchable: 0,
    //       verified: 0
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'rtyurtyu',
    //       password: await hash('rtyurtyu'),
    //       firstname: 'rtyurtyu',
    //       lastname: 'rtyurtyu',
    //       email: 'rtyurtyu@mailinator.com',
    //       gender: 'other',
    //       interest: 'any',
    //       age: '21',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 110,
    //       hash: await (await hash('rtyurtyu')).replace(/\//g, ''),
    //       longitude: 2.7878,
    //       latitude: -2.4537,
    //       matchable: 1,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'wqwevqvweq',
    //       password: await hash('wqwevqvweq'),
    //       firstname: 'wqwevqvweq',
    //       lastname: 'wqwevqvweq',
    //       email: 'wqwevqvweq@mailinator.com',
    //       gender: 'other',
    //       interest: 'any',
    //       age: '24',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 0,
    //       hash: await (await hash('wqwevqvweq')).replace(/\//g, ''),
    //       longitude: 1.7523,
    //       latitude: -2.4356,
    //       matchable: 0,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'ertynerny',
    //       password: await hash('ertynerny'),
    //       firstname: 'ertynerny',
    //       lastname: 'ertynerny',
    //       email: 'ertynerny@mailinator.com',
    //       gender: 'other',
    //       interest: 'any',
    //       age: '19',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 0,
    //       hash: await (await hash('ertynerny')).replace(/\//g, ''),
    //       longitude: 2.4576,
    //       latitude: -1.1254,
    //       matchable: 0,
    //       verified: 0
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'qvwfwevfq',
    //       password: await hash('qvwfwevfq'),
    //       firstname: 'qvwfwevfq',
    //       lastname: 'qvwfwevfq',
    //       email: 'qvwfwevfq@mailinator.com',
    //       gender: 'male',
    //       interest: 'male',
    //       age: '19',
    //       biography: 'I like to play Minecraft.',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 100,
    //       hash: await (await hash('qvwfwevfq')).replace(/\//g, ''),
    //       longitude: 2.5745,
    //       latitude: -1.1459,
    //       matchable: 1,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'qvwevqwevqq',
    //       password: await hash('qvwevqwevqq'),
    //       firstname: 'qvwevqwevqq',
    //       lastname: 'qvwevqwevqq',
    //       email: 'qvwevqwevqq@mailinator.com',
    //       gender: 'male',
    //       interest: 'male',
    //       age: '26',
    //       biography: 'I like to play LoL.',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 0,
    //       hash: await (await hash('qvwevqwevqq')).replace(/\//g, ''),
    //       longitude: 2.2746,
    //       latitude: -1.1981,
    //       matchable: 0,
    //       verified: 1
    //     });
    // })
    // .then(async function () {
    //   return knex('users')
    //     .insert({
    //       username: 'rntyrtuynr',
    //       password: await hash('rntyrtuynr'),
    //       firstname: 'rntyrtuynr',
    //       lastname: 'rntyrtuynr',
    //       email: 'rntyrtuynr@mailinator.com',
    //       gender: 'male',
    //       interest: 'male',
    //       age: '23',
    //       biography: 'I like to play DotA.',
    //       countryName: 'South Africa',
    //       city: 'Cape Town',
    //       fame: 0,
    //       hash: await (await hash('rntyrtuynr')).replace(/\//g, ''),
    //       longitude: 2.3673,
    //       latitude: -1.2456,
    //       matchable: 0,
    //       verified: 0
    //     });
    // })
};