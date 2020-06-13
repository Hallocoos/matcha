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

export function createMatchedRequest(matchData) {
  return knex('matches')
  .insert(matchData)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result)) // Turn data into JSON object
      return result
    });
};

export function setUsersAsMatched(acceptedUser: string, receivedUser: string) {
  return knex('matches')
    .update('accepted', 1)
    .where('acceptedUser', acceptedUser)
    .andWhere('receivedUser', receivedUser)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result)) // Turn data into JSON object
      return result
    });
};

export function setUsersAsBlocked(acceptedUser: string, receivedUser: string) {
  return knex('matches')
    .update('blocked', 1)
    .where('acceptedUser', acceptedUser)
    .andWhere('receivedUser', receivedUser)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result)) // Turn data into JSON object
      return result
    });
};

