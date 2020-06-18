import * as knex from '../../database/knex';


export function findUserById(id: string) {
  return knex.select()
    .from('users')
    .where('id', id)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      // console.log(result);
      return result;
    })
};

export function findUserByUsernameAndPassword(username: string, password: string) {
  return knex.select('id', 'username', 'firstname', 'lastname', 'email', 'gender', 'interest', 'age', 'tags', 'ip', 'countryName', 'regionName', 'city', 'zipcode', 'verified')
    .from('users')
    .where('username', username)
    .andWhere('password', password)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      // console.log(result);
      return result;
    })
};

export function findUserByUsername(username: string) {
  return knex.select('id')
    .from('users')
    .where('username', username)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      // console.log(result);
      return result;
    })
};

export function insertUser(data: any) {
  return knex('users')
    .insert(data)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      // console.log(result);
      return result;
    })
};

export function updateUser(data: any) {
  const id = data.id;
  delete data.id;
  return knex('users')
    .update(data)
    .where({ 'id': id })
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      // console.log(result);
      return result;
    })
};

export function findAllUsers() {
  return knex('users')
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      // console.log(result);
      return result;
    })
};
