import * as knex from '../../database/knex';

// export function function(columnData) {
//   return knex.select('columnsThatYouWant')
//     .from(table)
//     .where('column', isEqualToColumnData)
//     .then(function (result: []) {
//       result = JSON.parse(JSON.stringify(result)) // Turn data into JSON object
//       return result
//     });
// };

export function findUserById(id: string) {
  return knex.select()
    .from('users')
    .where('id', id)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      console.log(result);
      return result;
    })
};

export function findUserByUsernameAndPassword(username: string, password: string) {
  return knex.select()
    .from('users')
    .where('username', username)
    .andWhere('password', password)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      console.log(result);
      return result;
    })
};

export function insertUser(data: any) {
  return knex('users')
    .insert(data)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      console.log(result);
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
      console.log(result);
      return result;
    })
};

export function findAllUsers() {
  return knex('users')
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      console.log(result);
      return result;
    })
};
