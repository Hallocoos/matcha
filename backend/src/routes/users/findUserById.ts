// // import express from 'express';
// // import { Request, Response } from 'express';
// // import DBConfig from '../../models/databaseConnection';
// // const router = express.Router();

// // router.post('/findUserById', (request: Request, response: Response) => {
// //   // const query = "SELECT * FROM user WHERE id=" + request.body.id; + ";";
// //   // MatchaDB.connect((err) => {
// //   //   if (!err) {
// //   //     try {
// //   //       MatchaDB.query(query);
// //   //       console.log("HERE");
// //   //     } catch (e) {
// //   //       response.send(e);
// //   //     }
// //   //   } else {
// //   //     response.send(err);
// //   //   }
// //   // });
// //   DBConfig.getConnection(function (err, connection) {
// //     if (!err)
// //     {
// //       console.log('Connected to MySQL Database!');
// //       connection.query("CREATE DATABASE IF NOT EXISTS matcha;", (err, data) => {
// //         if (err)
// //           console.log(err);
// //         else
// //           response.send(data);
// //       });
// //     } else
// //       console.log(err);
// //     connection.release();
// //   });
// // });

// // export default router;

// require('dotenv').config()
// import * as knex from '../../models/databaseConnection'

// export function knexSelectByUserName (userName: string, targetTable: string) {
//   return knex.select()
//           .from(targetTable)
//           .where('userName', userName)
//           .then(function (result: []) {
//             result = JSON.parse(JSON.stringify(result))
//             return result
//           })
// }

// export function knexInsert (body, targetTable) {
//   return knex(targetTable)
//     .insert(body)
//     .then(function (result) {
//       return knexSelectById(result[0], targetTable)
//     })
// }

// export function knexSelectAll (targetTable: string) {
//   return knex.select()
//           .from(targetTable)
//           .then(function (result) {
//             result = JSON.parse(JSON.stringify(result))
//             return result
//           })
// }

// export function knexSelectById (id: number, targetTable: string) {
//   return knex.select()
//           .from(targetTable)
//           .where('id', id)
//           .then(function (result) {
//             result = JSON.parse(JSON.stringify(result))
//             return result
//           })
// }

// export function knexUpdateById (body, id, targetTable) {
//   return knex(targetTable)
//     .where('id', id)
//     .update(body)
//     .then(function () {
//       return knexSelectById(id, targetTable)
//     })
// }

// export function knexSelectByOwner (owner, targetTable) {
//   return knex.select()
//    .from(targetTable)
//     .where('owner', owner)
//     .then(function (result) {
//       result = JSON.parse(JSON.stringify(result))
//       return result
//     })
// }

// export function knexSelectTransactionByEitherAccount (id, targetTable) {
//   return knex.select()
//           .from(targetTable)
//           .where('debitAccountId', id)
//           .orWhere('creditAccountId', id)
//           .then(function (result) {
//             result = JSON.parse(JSON.stringify(result))
//             return result
//           })
// }