import express from 'express';
import { Request, Response } from 'express';
import { connect } from 'mongodb';

const router = express.Router();

/**
 * @apiName verifyLogin({username, password});
 * @apiDescription Checks if password and username matches a user in the database
 * @apiMethod POST
 * @apiRoute /findUserByUsernameAndPassword
 * 
 * @apiParamFormat {type} Param Format:
 * { username: <string>, password: <string> }
 *
 * @apiParamExample {type} Param Example:
 * { username: 'Wouter', password: '123455678' }
 *
 * @apiSuccessExample Boolean Success-Response:
 * true <-- If username and password is correct
 *
 * @apiSuccessExample Boolean Failed-Response:
 * false <-- If username or password is incorrect
 */

router.post('/findUserByUsernameAndPassword', (request: Request, response: Response) => {
  const query = 
  [{
    $match:
      { username: request.body.username, 
        password: request.body.password }
  }, {
    $project:
      { _id: 1}
  }];
  connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (!err) {
      const dbName = client.db(process.env.MONGO_DB);
      try {
        dbName.collection('users').aggregate(query).toArray((err, data) => {
          if (!err && data !== undefined && data.length > 0)
            response.send(true);
          else
            response.send(false);
        });
      } catch (e) {
        response.send(e);
      }
    } else {
      response.send(err);
    }
  })
})

export default router;