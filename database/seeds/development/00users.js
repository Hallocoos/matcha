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
  // 1
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
      // 2
      .then(async function () {
      return knex('users')
        .insert({
          username: 'Fulk',
          password: await hash('Fulk'),
          firstname: 'Fulk',
          lastname: 'Riverhopper',
          email: 'FulkRiverhopper@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '18',
          biography: 'I like to play Dungeon Defenders 2.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 234,
          hash: await (await hash('Riverhopper')).replace(/\//g, ''),
          longitude: 2.5763,
          latitude: -2.9814,
          matchable: 1,
          verified: 1
        });
    })
      // 3
      .then(async function () {
      return knex('users')
        .insert({
          username: 'Samo',
          password: await hash('Samo'),
          firstname: 'Samo',
          lastname: 'Wanderfoot',
          email: 'SamoWanderfoot@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '21',
          biography: 'I like to play Banished.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 100,
          hash: await (await hash('Wanderfoot')).replace(/\//g, ''),
          longitude: 1.6254,
          latitude: -1.7145,
          matchable: 1,
          verified: 1
        });
    })
      // 4
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Bruno',
          password: await hash('Bruno'),
          firstname: 'Bruno',
          lastname: 'Banks',
          email: 'BrunoBanks@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '25',
          biography: 'I like to play Terraria.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 874,
          hash: await (await hash('Banks')).replace(/\//g, ''),
          longitude: 1.2192,
          latitude: -1.8648,
          matchable: 1,
          verified: 1
        });
    })
      // 5
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Gerontius',
          password: await hash('Gerontius'),
          firstname: 'Gerontius',
          lastname: 'Silverstring',
          email: 'GerontiusSilverstring@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '20',
          biography: 'I like to play CSGO.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 100,
          hash: await (await hash('Silverstring')).replace(/\//g, ''),
          longitude: 1.2745,
          latitude: -1.8743,
          matchable: 1,
          verified: 1
        });
    })
      // 6
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Saradoc',
          password: await hash('12345678'),
          firstname: 'Saradoc',
          lastname: 'Harfoot',
          email: 'SaradocHarfoot@mailinator.com',
          gender: 'male',
          interest: 'female',
          age: '21',
          biography: 'I don\'t like to play POE.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('Harfoot')).replace(/\//g, ''),
          longitude: 2.2856,
          latitude: -1.7841,
          matchable: 0,
          verified: 0
        });
    })
      // 7
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Lothar',
                password: await hash('Lothar'),
                firstname: 'Lothar',
                lastname: 'Lightfoot',
                email: 'LotharLightfoot@mailinator.com',
                gender: 'male',
                interest: 'female',
                age: '25',
                biography: 'I am, Lothar the Monster that monster energy drink talks about.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 0,
                hash: await (await hash('Lightfoot')).replace(/\//g, ''),
                longitude: 1.2815,
                latitude: -2.5941,
                matchable: 0,
                verified: 1
            });
    })
      // 8
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Atula',
                password: await hash('Atula'),
                firstname: 'Atula',
                lastname: 'Boffin',
                email: 'AtulaBoffin@mailinator.com',
                gender: 'female',
                interest: 'male',
                age: '30',
                biography: 'I like to breath.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 463,
                hash: await (await hash('Boffin')).replace(/\//g, ''),
                longitude: 1.9576,
                latitude: -2.5374,
                matchable: 1,
                verified: 1
            });
    })
      // 9
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Jemima',
                password: await hash('Jemima'),
                firstname: 'Jemima',
                lastname: 'Thornburrow',
                email: 'JemimaThornburrow@mailinator.com',
                gender: 'female',
                interest: 'male',
                age: '20',
                biography: 'I like to dragon.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 123,
                hash: await (await hash('Thornburrow')).replace(/\//g, ''),
                longitude: 1.1346,
                latitude: -1.8764,
                matchable: 1,
                verified: 1
            });
    })
      // 10
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Clothild',
                password: await hash('Clothild'),
                firstname: 'Clothild',
                lastname: 'Fairfoot',
                email: 'oiuqnhnuvh@mailinator.com',
                gender: 'female',
                interest: 'male',
                age: '18',
                biography: 'I like to hobbit.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 65,
                hash: await (await hash('Fairfoot')).replace(/\//g, ''),
                longitude: 2.2724,
                latitude: -2.1891,
                matchable: 1,
                verified: 1
            });
    })
      // 11
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Ingeltrudis',
                password: await hash('Ingeltrudis'),
                firstname: 'Ingeltrudis',
                lastname: 'Riverhopperer',
                email: 'oiuwnhvfiuh@mailinator.com',
                gender: 'female',
                interest: 'male',
                age: '22',
                biography: 'I like to laugh.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 120,
                hash: await (await hash('Riverhopperer')).replace(/\//g, ''),
                longitude: 2.1385,
                latitude: -1.2346,
                matchable: 1,
                verified: 1
            });
    })
      // 12
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Nicole',
                password: await hash('Nicole'),
                firstname: 'Nicole',
                lastname: 'Hogpen',
                email: 'oijabsdofijb@mailinator.com',
                gender: 'female',
                interest: 'male',
                age: '23',
                biography: 'I like to drive.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 26,
                hash: await (await hash('Hogpen')).replace(/\//g, ''),
                longitude: 1.2136,
                latitude: -1.9646,
                matchable: 1,
                verified: 1
            });
    })
      // 13
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Beren',
                password: await hash('Beren'),
                firstname: 'Beren',
                lastname: 'Brandybuck',
                email: 'tyui@mailinator.com',
                gender: 'female',
                interest: 'male',
                age: '21',
                biography: 'I like to shop.',
                countryName: 'tyuityui',
                city: 'tyuityui',
                fame: 1000,
                hash: await (await hash('Brandybuck')).replace(/\//g, ''),
                longitude: 17.0401,
                latitude: -32.1827,
                matchable: 1,
                verified: 1
            });
    })
      // 14
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Theodraded',
                password: await hash('Theodraded'),
                firstname: 'Theodraded',
                lastname: 'Gwiftfoot',
                email: 'qwerqwer@mailinator.com',
                gender: 'female',
                interest: 'male',
                age: '18',
                biography: 'I like to skip and hop.',
                countryName: 'qwerqwer',
                city: 'qwerqwer',
                fame: 0,
                hash: await (await hash('Gwiftfoot')).replace(/\//g, ''),
                longitude: 2.5481,
                latitude: -1.6794,
                matchable: 0,
                verified: 1
            });
    })
      // 15
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Niroshan',
                password: await hash('Niroshan'),
                firstname: 'Niroshan',
                lastname: 'Nivaesh',
                email: 'wertwert@mailinator.com',
                gender: 'female',
                interest: 'male',
                age: '22',
                biography: 'I like to floss.',
                countryName: 'wertwert',
                city: 'wertwert',
                fame: 0,
                hash: await (await hash('Nivaesh')).replace(/\//g, ''),
                longitude: 1.4563,
                latitude: -1.1268,
                matchable: 0,
                verified: 0
            });
    })
      // 16
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Eulimenei',
                password: await hash('Eulimenei'),
                firstname: 'Eulimenei',
                lastname: 'Halia',
                email: 'zxcvzxcv@mailinator.com',
                gender: 'female',
                interest: 'female',
                age: '25',
                biography: 'I like to click.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 56,
                hash: await (await hash('Halia')).replace(/\//g, ''),
                longitude: 1.3456,
                latitude: -2.1374,
                matchable: 1,
                verified: 1
            });
    })
      // 17
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Eriphia',
                password: await hash('Eriphia'),
                firstname: 'Eriphia',
                lastname: 'Merylle',
                email: 'qwefvbyyb@mailinator.com',
                gender: 'female',
                interest: 'female',
                age: '19',
                biography: 'I like to whip & nae nae.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 523,
                hash: await (await hash('Merylle')).replace(/\//g, ''),
                longitude: 1.1265,
                latitude: -2.1467,
                matchable: 1,
                verified: 1
            });
    })
      // 18
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Ecole',
                password: await hash('Ecole'),
                firstname: 'Ecole',
                lastname: 'Kneecole',
                email: 'rnjnjrtrnjt@mailinator.com',
                gender: 'female',
                interest: 'female',
                age: '29',
                biography: 'I like to laugh.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 122,
                hash: await (await hash('Kneecole')).replace(/\//g, ''),
                longitude: 1.1456,
                latitude: -2.8493,
                matchable: 1,
                verified: 1
            });
    })
      // 19
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Harimoni',
                password: await hash('Harimoni'),
                firstname: 'Harimoni',
                lastname: 'Yora-Lyzurd',
                email: 'opasnmhfvop@mailinator.com',
                gender: 'female',
                interest: 'female',
                age: '27',
                biography: 'I like to clean.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 73,
                hash: await (await hash('Yora-Lyzurd')).replace(/\//g, ''),
                longitude: 1.7348,
                latitude: -2.7839,
                matchable: 1,
                verified: 1
            });
    })
      // 20
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Alexidoe',
                password: await hash('Alexidoe'),
                firstname: 'Alexidoe',
                lastname: 'Morea',
                email: 'zosimhiuzsoh@mailinator.com',
                gender: 'female',
                interest: 'female',
                age: '22',
                biography: 'I like to kick.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 23,
                hash: await (await hash('Morea')).replace(/\//g, ''),
                longitude: 1.6502,
                latitude: -2.1560,
                matchable: 1,
                verified: 1
            });
    })
      // 21
    .then(async function () {
        return knex('users')
            .insert({
                username: 'uiop',
                password: await hash('uiop'),
                firstname: 'Palacia',
                lastname: 'Syllis',
                email: 'uiop@mailinator.com',
                gender: 'female',
                interest: 'female',
                age: '20',
                biography: 'I like to jump.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 0,
                hash: await (await hash('Syllis')).replace(/\//g, ''),
                longitude: 1.9658,
                latitude: -1.9234,
                matchable: 0,
                verified: 1
            });
    })
      // 22
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Clonia',
                password: await hash('Clonia'),
                firstname: 'Clonia',
                lastname: 'Salomise',
                email: 'sdfgsdfg@mailinator.com',
                gender: 'female',
                interest: 'female',
                age: '21',
                biography: 'I like to fart.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 110,
                hash: await (await hash('Salomise')).replace(/\//g, ''),
                longitude: 2.3564,
                latitude: -2.1524,
                matchable: 0,
                verified: 0
            });
    })
      // 23
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Mariphine',
                password: await hash('Mariphine'),
                firstname: 'Mariphine',
                lastname: 'Thosei',
                email: 'rtyurtyu@mailinator.com',
                gender: 'other',
                interest: 'any',
                age: '21',
                biography: 'I like to listen.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 110,
                hash: await (await hash('Thosei')).replace(/\//g, ''),
                longitude: 2.7878,
                latitude: -2.4537,
                matchable: 1,
                verified: 1
            });
    })
      // 24
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Elidia',
                password: await hash('Elidia'),
                firstname: 'Elidia',
                lastname: 'Taniara',
                email: 'luashdnfoi@mailinator.com',
                gender: 'other',
                interest: 'any',
                age: '20',
                biography: 'I like to fling.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 753,
                hash: await (await hash('Taniara')).replace(/\//g, ''),
                longitude: 2.1836,
                latitude: -2.9857,
                matchable: 1,
                verified: 1
            });
    })
      // 25
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Acotali',
                password: await hash('Acotali'),
                firstname: 'Acotali',
                lastname: 'Actina',
                email: 'oijbotrgijb@mailinator.com',
                gender: 'other',
                interest: 'any',
                age: '26',
                biography: 'I like to laugh.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 68,
                hash: await (await hash('Actina')).replace(/\//g, ''),
                longitude: 2.6589,
                latitude: -2.1452,
                matchable: 1,
                verified: 1
            });
    })
      // 26
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Bromia',
                password: await hash('Bromia'),
                firstname: 'Bromia',
                lastname: 'Hair',
                email: 'rtyurtyu@mailinator.com',
                gender: 'other',
                interest: 'any',
                age: '21',
                biography: 'I like to sing.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 110,
                hash: await (await hash('Hair')).replace(/\//g, ''),
                longitude: 2.3524,
                latitude: -2.3698,
                matchable: 1,
                verified: 1
            });
    })
      // 28
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Kaephei',
                password: await hash('Kaephei'),
                firstname: 'Kaephei',
                lastname: 'Polyxio',
                email: 'qwerbtqyebyu@mailinator.com',
                gender: 'other',
                interest: 'any',
                age: '19',
                biography: 'I like to sign.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 95,
                hash: await (await hash('Polyxio')).replace(/\//g, ''),
                longitude: 2.3654,
                latitude: -2.7852,
                matchable: 1,
                verified: 1
            });
    })
      // 29
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Naise',
                password: await hash('Naise'),
                firstname: 'Naise',
                lastname: 'Limorei',
                email: 'wqwevqvweq@mailinator.com',
                gender: 'other',
                interest: 'any',
                age: '24',
                biography: 'I like to play Witcher 1.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 0,
                hash: await (await hash('Limorei')).replace(/\//g, ''),
                longitude: 1.7523,
                latitude: -2.4356,
                matchable: 0,
                verified: 1
            });
    })
      // 30
    .then(async function () {
        return knex('users')
            .insert({
                username: 'Rhetila',
                password: await hash('Rhetila'),
                firstname: 'Rhetila',
                lastname: 'Thrassa',
                email: 'ertynerny@mailinator.com',
                gender: 'other',
                interest: 'any',
                age: '19',
                biography: 'I like to play Witch hunt.',
                countryName: 'South Africa',
                city: 'Cape Town',
                fame: 0,
                hash: await (await hash('Thrassa')).replace(/\//g, ''),
                longitude: 2.4576,
                latitude: -1.1254,
                matchable: 0,
                verified: 0
            });
    })
      // 31
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Meniphis',
          password: await hash('Meniphis'),
          firstname: 'Meniphis',
          lastname: 'Creasi',
          email: 'qvwfwevfq@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '19',
          biography: 'I like to play Witcher 3.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 100,
          hash: await (await hash('Creasi')).replace(/\//g, ''),
          longitude: 2.5745,
          latitude: -1.1459,
          matchable: 1,
          verified: 1
        });
    })
      // 32
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Neamertise',
          password: await hash('Neamertise'),
          firstname: 'Neamertise',
          lastname: 'Klaia',
          email: 'oiaunmshiu@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '20',
          biography: 'I like to play Witcher 2.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 321,
          hash: await (await hash('Klaia')).replace(/\//g, ''),
          longitude: 1.6587,
          latitude: -1.1798,
          matchable: 1,
          verified: 1
        });
    })
      // 33
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Alexiroe',
          password: await hash('Alexiroe'),
          firstname: 'Alexiroe',
          lastname: 'Pareila',
          email: 'wntrhnwrtre@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '26',
          biography: 'I like to play Frostpunk.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 865,
          hash: await (await hash('Pareila')).replace(/\//g, ''),
          longitude: 2.4165,
          latitude: -1.3658,
          matchable: 1,
          verified: 1
        });
    })
      // 34
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Klymene',
          password: await hash('Klymene'),
          firstname: 'Klymene',
          lastname: 'Pirene',
          email: 'oipbiuvyt@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '24',
          biography: 'I like to play Borderlands 2.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 75,
          hash: await (await hash('Pirene')).replace(/\//g, ''),
          longitude: 2.9811,
          latitude: -1.1932,
          matchable: 1,
          verified: 1
        });
    })
      // 35
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Lysianassa',
          password: await hash('Lysianassa'),
          firstname: 'Lysianassa',
          lastname: 'Telidaki',
          email: 'trztrztrzqwe@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '19',
          biography: 'I like to play Minecraft.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 723,
          hash: await (await hash('Telidaki')).replace(/\//g, ''),
          longitude: 2.2347,
          latitude: -1.7137,
          matchable: 1,
          verified: 1
        });
    })
      // 36
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Celaeno',
          password: await hash('Celaeno'),
          firstname: 'Celaeno',
          lastname: 'Prosymeina',
          email: 'qvwevqwevqq@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '26',
          biography: 'I like to play LoL.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('Prosymeina')).replace(/\//g, ''),
          longitude: 2.2746,
          latitude: -1.1981,
          matchable: 0,
          verified: 1
        });
    })
      // 37
    .then(async function () {
      return knex('users')
        .insert({
          username: 'Laomedeia',
          password: await hash('Laomedeia'),
          firstname: 'Laomedeia',
          lastname: 'Ilanara',
          email: 'rntyrtuynr@mailinator.com',
          gender: 'male',
          interest: 'male',
          age: '23',
          biography: 'I like to play DotA.',
          countryName: 'South Africa',
          city: 'Cape Town',
          fame: 0,
          hash: await (await hash('Ilanara')).replace(/\//g, ''),
          longitude: 2.3673,
          latitude: -1.2456,
          matchable: 0,
          verified: 0
        });
    })
};