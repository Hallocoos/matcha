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
          biography: 'I like to play POE.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 100,
          hash: await (await hash('Hallocoos')).replace(/\//g, ''),
          longitude: 2.2126,
          latitude: -1.2341,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'qwvfbfqbfq',
          password: await hash('qwvfbfqbfq'),
          firstname: 'qwvfbfqbfq',
          lastname: 'qwvfbfqbfq',
          email: 'qwvfbfqbfq@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '18',
          biography: 'I like to play Dungeon Defenders 2.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 234,
          hash: await (await hash('qwvfbfqbfq')).replace(/\//g, ''),
          longitude: 2.5763,
          latitude: -2.9814,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'rtnjehrtnhnrt',
          password: await hash('rtnjehrtnhnrt'),
          firstname: 'rtnjehrtnhnrt',
          lastname: 'rtnjehrtnhnrt',
          email: 'rtnjehrtnhnrt@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '21',
          biography: 'I like to play Banished.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 100,
          hash: await (await hash('rtnjehrtnhnrt')).replace(/\//g, ''),
          longitude: 1.6254,
          latitude: -1.7145,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'gnnntuytnmtn',
          password: await hash('gnnntuytnmtn'),
          firstname: 'gnnntuytnmtn',
          lastname: 'gnnntuytnmtn',
          email: 'gnnntuytnmtn@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '25',
          biography: 'I like to play Terraria.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 874,
          hash: await (await hash('gnnntuytnmtn')).replace(/\//g, ''),
          longitude: 1.2192,
          latitude: -1.8648,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'nuhanuwmhm',
          password: await hash('nuhanuwmhm'),
          firstname: 'nuhanuwmhm',
          lastname: 'nuhanuwmhm',
          email: 'nuhanuwmhm@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '20',
          biography: 'I like to play CSGO.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 100,
          hash: await (await hash('nuhanuwmhm')).replace(/\//g, ''),
          longitude: 1.2745,
          latitude: -1.8743,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'nwevfqnss',
          password: await hash('12345678'),
          firstname: 'John',
          lastname: 'the Monster',
          email: 'nwevfqnss@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '21',
          biography: 'I don\'t like to play POE.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('nwevfqnss')).replace(/\//g, ''),
          longitude: 2.2856,
          latitude: -1.7841,
          matchable: 0,
          verified: 0
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'vqfwevfqwevfq',
          password: await hash('vqfwevfqwevfq'),
          firstname: 'vqfwevfqwevfq',
          lastname: 'vqfwevfqwevfq',
          email: 'vqfwevfqwevfq@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '25',
          biography: 'I am vqfwevfqwevfq the Monster.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('vqfwevfqwevfq')).replace(/\//g, ''),
          longitude: 1.2815,
          latitude: -2.5941,
          matchable: 0,
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
          email: 'asdfasdf@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '30',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 463,
          hash: await (await hash('asdfasdf')).replace(/\//g, ''),
          longitude: 1.9576,
          latitude: -2.5374,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'oiuqvgmhoiuqh',
          password: await hash('oiuqvgmhoiuqh'),
          firstname: 'oiuqvgmhoiuqh',
          lastname: 'oiuqvgmhoiuqh',
          email: 'oiuqvgmhoiuqh@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '20',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 123,
          hash: await (await hash('oiuqvgmhoiuqh')).replace(/\//g, ''),
          longitude: 1.1346,
          latitude: -1.8764,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'oiuqnhnuvh',
          password: await hash('oiuqnhnuvh'),
          firstname: 'oiuqnhnuvh',
          lastname: 'oiuqnhnuvh',
          email: 'oiuqnhnuvh@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '18',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 65,
          hash: await (await hash('oiuqnhnuvh')).replace(/\//g, ''),
          longitude: 2.2724,
          latitude: -2.1891,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'oiuwnhvfiuh',
          password: await hash('oiuwnhvfiuh'),
          firstname: 'oiuwnhvfiuh',
          lastname: 'oiuwnhvfiuh',
          email: 'oiuwnhvfiuh@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '22',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 120,
          hash: await (await hash('oiuwnhvfiuh')).replace(/\//g, ''),
          longitude: 2.1385,
          latitude: -1.2346,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'oijabsdofijb',
          password: await hash('oijabsdofijb'),
          firstname: 'oijabsdofijb',
          lastname: 'oijabsdofijb',
          email: 'oijabsdofijb@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '23',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 26,
          hash: await (await hash('oijabsdofijb')).replace(/\//g, ''),
          longitude: 1.2136,
          latitude: -1.9646,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'tyuityui',
          password: await hash('tyuityui'),
          firstname: 'tyuityui',
          lastname: 'tyuityui',
          email: 'tyui@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '21',
          countryName: 'tyuityui',
          city: 'tyuityui',
          fame: 1000,
          hash: await (await hash('tyuityui')).replace(/\//g, ''),
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
          email: 'qwerqwer@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '18',
          countryName: 'qwerqwer',
          city: 'qwerqwer',
          fame: 0,
          hash: await (await hash('qwerqwer')).replace(/\//g, ''),
          longitude: 2.5481,
          latitude: -1.6794,
          matchable: 0,
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
          email: 'wertwert@mailinator.com',
          gender: 'female',
          interest: 'male',
          age: '22',
          countryName: 'wertwert',
          city: 'wertwert',
          fame: 0,
          hash: await (await hash('wertwert')).replace(/\//g, ''),
          longitude: 1.4563,
          latitude: -1.1268,
          matchable: 0,
          verified: 0
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'zxcvzxcv',
          password: await hash('zxcvzxcv'),
          firstname: 'zxcvzxcv',
          lastname: 'zxcvzxcv',
          email: 'zxcvzxcv@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '25',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 56,
          hash: await (await hash('zxcvzxcv')).replace(/\//g, ''),
          longitude: 1.3456,
          latitude: -2.1374,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'qwefvbyyb',
          password: await hash('qwefvbyyb'),
          firstname: 'qwefvbyyb',
          lastname: 'qwefvbyyb',
          email: 'qwefvbyyb@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '19',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 523,
          hash: await (await hash('qwefvbyyb')).replace(/\//g, ''),
          longitude: 1.1265,
          latitude: -2.1467,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'rnjnjrtrnjt',
          password: await hash('rnjnjrtrnjt'),
          firstname: 'rnjnjrtrnjt',
          lastname: 'rnjnjrtrnjt',
          email: 'rnjnjrtrnjt@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '29',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 122,
          hash: await (await hash('rnjnjrtrnjt')).replace(/\//g, ''),
          longitude: 1.1456,
          latitude: -2.8493,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'opasnmhfvop',
          password: await hash('opasnmhfvop'),
          firstname: 'opasnmhfvop',
          lastname: 'opasnmhfvop',
          email: 'opasnmhfvop@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '27',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 73,
          hash: await (await hash('opasnmhfvop')).replace(/\//g, ''),
          longitude: 1.7348,
          latitude: -2.7839,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'zosimhiuzsoh',
          password: await hash('zosimhiuzsoh'),
          firstname: 'zosimhiuzsoh',
          lastname: 'zosimhiuzsoh',
          email: 'zosimhiuzsoh@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '22',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 23,
          hash: await (await hash('zosimhiuzsoh')).replace(/\//g, ''),
          longitude: 1.6502,
          latitude: -2.1560,
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
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('uiop')).replace(/\//g, ''),
          longitude: 1.9658,
          latitude: -1.9234,
          matchable: 0,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'sdfgsdfg',
          password: await hash('sdfgsdfg'),
          firstname: 'sdfgsdfg',
          lastname: 'sdfgsdfg',
          email: 'sdfgsdfg@mailinator.com',
          gender: 'female',
          interest: 'female',
          age: '21',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 110,
          hash: await (await hash('sdfgsdfg')).replace(/\//g, ''),
          longitude: 2.3564,
          latitude: -2.1524,
          matchable: 0,
          verified: 0
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'rtyurtyu',
          password: await hash('rtyurtyu'),
          firstname: 'rtyurtyu',
          lastname: 'rtyurtyu',
          email: 'rtyurtyu@mailinator.com',
          gender: 'other',
          interest: 'any',
          age: '21',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 110,
          hash: await (await hash('rtyurtyu')).replace(/\//g, ''),
          longitude: 2.7878,
          latitude: -2.4537,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'luashdnfoi',
          password: await hash('luashdnfoi'),
          firstname: 'luashdnfoi',
          lastname: 'luashdnfoi',
          email: 'luashdnfoi@mailinator.com',
          gender: 'other',
          interest: 'any',
          age: '20',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 753,
          hash: await (await hash('luashdnfoi')).replace(/\//g, ''),
          longitude: 2.1836,
          latitude: -2.9857,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'oijbotrgijb',
          password: await hash('oijbotrgijb'),
          firstname: 'oijbotrgijb',
          lastname: 'oijbotrgijb',
          email: 'oijbotrgijb@mailinator.com',
          gender: 'other',
          interest: 'any',
          age: '26',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 68,
          hash: await (await hash('oijbotrgijb')).replace(/\//g, ''),
          longitude: 2.6589,
          latitude: -2.1452,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'rtyurtyu',
          password: await hash('rtyurtyu'),
          firstname: 'rtyurtyu',
          lastname: 'rtyurtyu',
          email: 'rtyurtyu@mailinator.com',
          gender: 'other',
          interest: 'any',
          age: '21',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 110,
          hash: await (await hash('rtyurtyu')).replace(/\//g, ''),
          longitude: 2.3524,
          latitude: -2.3698,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'qwerbtqyebyu',
          password: await hash('qwerbtqyebyu'),
          firstname: 'qwerbtqyebyu',
          lastname: 'qwerbtqyebyu',
          email: 'qwerbtqyebyu@mailinator.com',
          gender: 'other',
          interest: 'any',
          age: '19',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 95,
          hash: await (await hash('qwerbtqyebyu')).replace(/\//g, ''),
          longitude: 2.3654,
          latitude: -2.7852,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'wqwevqvweq',
          password: await hash('wqwevqvweq'),
          firstname: 'wqwevqvweq',
          lastname: 'wqwevqvweq',
          email: 'wqwevqvweq@mailinator.com',
          gender: 'other',
          interest: 'any',
          age: '24',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('wqwevqvweq')).replace(/\//g, ''),
          longitude: 1.7523,
          latitude: -2.4356,
          matchable: 0,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'ertynerny',
          password: await hash('ertynerny'),
          firstname: 'ertynerny',
          lastname: 'ertynerny',
          email: 'ertynerny@mailinator.com',
          gender: 'other',
          interest: 'any',
          age: '19',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('ertynerny')).replace(/\//g, ''),
          longitude: 2.4576,
          latitude: -1.1254,
          matchable: 0,
          verified: 0
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'qvwfwevfq',
          password: await hash('qvwfwevfq'),
          firstname: 'qvwfwevfq',
          lastname: 'qvwfwevfq',
          email: 'qvwfwevfq@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '19',
          biography: 'I like to play Witcher 3.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 100,
          hash: await (await hash('qvwfwevfq')).replace(/\//g, ''),
          longitude: 2.5745,
          latitude: -1.1459,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'oiaunmshiu',
          password: await hash('oiaunmshiu'),
          firstname: 'oiaunmshiu',
          lastname: 'oiaunmshiu',
          email: 'oiaunmshiu@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '20',
          biography: 'I like to play Witcher 2.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 321,
          hash: await (await hash('oiaunmshiu')).replace(/\//g, ''),
          longitude: 1.6587,
          latitude: -1.1798,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'wntrhnwrtre',
          password: await hash('wntrhnwrtre'),
          firstname: 'wntrhnwrtre',
          lastname: 'wntrhnwrtre',
          email: 'wntrhnwrtre@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '26',
          biography: 'I like to play Frostpunk.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 865,
          hash: await (await hash('wntrhnwrtre')).replace(/\//g, ''),
          longitude: 2.4165,
          latitude: -1.3658,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'oipbiuvyt',
          password: await hash('oipbiuvyt'),
          firstname: 'oipbiuvyt',
          lastname: 'oipbiuvyt',
          email: 'oipbiuvyt@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '24',
          biography: 'I like to play Borderlands 2.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 75,
          hash: await (await hash('oipbiuvyt')).replace(/\//g, ''),
          longitude: 2.9811,
          latitude: -1.1932,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'trztrztrzqwe',
          password: await hash('trztrztrzqwe'),
          firstname: 'trztrztrzqwe',
          lastname: 'trztrztrzqwe',
          email: 'trztrztrzqwe@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '19',
          biography: 'I like to play Minecraft.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 723,
          hash: await (await hash('trztrztrzqwe')).replace(/\//g, ''),
          longitude: 2.2347,
          latitude: -1.7137,
          matchable: 1,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'qvwevqwevqq',
          password: await hash('qvwevqwevqq'),
          firstname: 'qvwevqwevqq',
          lastname: 'qvwevqwevqq',
          email: 'qvwevqwevqq@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '26',
          biography: 'I like to play LoL.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('qvwevqwevqq')).replace(/\//g, ''),
          longitude: 2.2746,
          latitude: -1.1981,
          matchable: 0,
          verified: 1
        });
    })
    .then(async function () {
      return knex('users')
        .insert({
          username: 'rntyrtuynr',
          password: await hash('rntyrtuynr'),
          firstname: 'rntyrtuynr',
          lastname: 'rntyrtuynr',
          email: 'rntyrtuynr@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '23',
          biography: 'I like to play DotA.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('rntyrtuynr')).replace(/\//g, ''),
          longitude: 2.3673,
          latitude: -1.2456,
          matchable: 0,
          verified: 0
        });
    })
};