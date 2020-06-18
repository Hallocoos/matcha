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

export function findImagesByUserId(userId: string) {
  return knex('images')
    .select()
    .where('userId', userId)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      return result;
    });
};

export function updateImage(imageData: any) {
  return knex('images')
    .update('image', imageData.image)
    .where('id', imageData.id)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      return result;
    });
};

export function storeImage(imageData: any) {
  return knex('images')
    .insert(imageData)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      return result;
    });
};

export function deleteImageById(imageId: string) {
  return knex('images')
    .where('id', imageId)
    .del()
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result));
      return result;
    });
};
