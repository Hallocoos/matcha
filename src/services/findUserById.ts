import * as knex from '../../database/knex'

/**
 *
 * @apiName verifyUserById({_id})
 * @apiDescription Sets the user as verified
 * @apiMethod POST
 * @apiRoute /verifyUserById
 *
 * @apiParamFormat {type} Param Format:
 * { _id: <string> }
 * @apiParamExample {type} Param Example:
 * { _id: '5e1eece605fa3d2ca82c81c8' }
 * @apiSuccessExample {type} Success-Response:
 * {
 *   'n': 1,
 *   'nModified': 1,
 *   'ok': 1
 * }
 */

// export function findUserById(id: string) {
//   return knex.select()
//     .from('user')
//     .where('id', id)
//     .then(function (result: []) {
//       result = JSON.parse(JSON.stringify(result))
//       return result
//     })
// };

export function insertUser(userData: any) {
  return knex('user').insert(userData)
    .then(function (result: []) {
      result = JSON.parse(JSON.stringify(result))
      console.log(result);
      return result
    })
};