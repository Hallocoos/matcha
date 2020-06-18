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

export function createMatchedRequest(matchData: any) {
  return knex('matches')
    .insert(matchData)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result)) // Turn data into JSON object
      return result
    });
};

export function setUsersAsMatched(acceptUserId: string, requestUserId: string) {
  return knex('matches')
    .update('accepted', 1)
    .where('acceptUserId', acceptUserId)
    .andWhere('requestUserId', requestUserId)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result)) // Turn data into JSON object
      return result
    });
};

export function setUsersAsBlocked(acceptUserId: string, requestUserId: string) {
  return knex('matches')
    .update('blocked', 1)
    .where('acceptUserId', acceptUserId)
    .andWhere('requestUserId', requestUserId)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result)) // Turn data into JSON object
      return result
    });
};

