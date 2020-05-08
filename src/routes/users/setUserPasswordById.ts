import express from 'express';
import { Request, Response } from 'express';
import { connect } from 'mongodb';
const ObjectId = require('mongodb').ObjectId;
type ObjectId = typeof import('mongodb').ObjectId;

const router = express.Router();

/**
 *
 * @apiName setPasswordById({_id, oldPassword, newPassword})
 * @apiDescription Change a users password
 * @apiMethod POST
 * @apiRoute /setPasswordById
 *
 * @apiParamFormat {type} Param Format:
 * {_id: <string>, oldPassword: <string>, newPassword: <string>}
 * @apiParamExample {type} Param Example:
 * {_id: '5e1eece605fa3d2ca82c81c8', oldPassword: '12345678', newPassword: 'asdfasdf'}
 * @apiSuccessExample {type} Success-Response:
 * {
 *   'n': 1,
 *   'nModified': 1,
 *   'ok': 1
 * }
 */

router.post('/setPasswordById', (request: Request, response: Response) => {
  const filter =
  {
    _id: ObjectId(request.body._id),
    password: request.body.oldPassword
  };
  const query =
  {
    $set: {
      password: request.body.newPassword
    }
  };
  console.log(filter, query);
  connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (!err) {
      const dbName = client.db(process.env.MONGO_DB);
      try {
        dbName.collection('users').updateOne(filter, query, (err, data) => {
          if (err)
            response.send(err);
          else
            response.send(data);
        });
      } catch (e) {
        response.send(e);
      }
    } else {
      response.send(err);
    }
    client.close();
  })
});

export default router;


