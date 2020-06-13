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

export function findImagesByUserId(userId) {
  return knex('images')
    .select()
    .where('userId', userId)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      return result;
    });
};

export function storeImage(imageData) {
  return knex('images')
    .insert(imageData)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      return result;
    });
};

export function deleteImageById(userId) {
  return knex('images')
    .where('userId', userId)
    .del()
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      return result;
    });
};
