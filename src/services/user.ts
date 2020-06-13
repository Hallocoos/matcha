import * as knex from '../../database/knex'

export function findUserById(id: string) {
  return knex.select()
    .from('user')
    .where('id', id)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result))
      return result
    })
};

export function insertUser(userData: any) {
  return knex('user')
    .insert(userData)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result))
      console.log(result);
      return result
    })
};