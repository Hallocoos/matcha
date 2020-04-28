import express from 'express';
import { Request, Response } from 'express';
import { connect } from 'mongodb';
const ObjectID = require('mongodb').ObjectID;
type ObjectID = typeof import('mongodb').ObjectID;
// const util = require('util');

const router = express.Router();

/**
 *
 * @apiName upsertUser();
 * @apiDescription Insert or update a user. If ID is sent as a parameter, then the user will be updated, otherwise a new user will be created.
 * @apiMethod POST
 * @apiRoute /upsertUser
 *
 * @apiParamFormat {type} Param Format:
 * { property: value,
 *   property2: value2,
 *   etc...
 * }
 * 
 * @apiParamExample {type} Param Example:
 * {
 *   "_id" : "5e1eece605fa3d2ca82c81c8",
 *   "ip" : "197.229.4.202",
 *   "zip_code" : "7945",
 *   "city" : "Cape Town",
 *   "region_name" : "Western Cape",
 *   "country_name" : "South Africa",
 *   "firstname" : "Hallocoos",
 *   "lastname" : "Cuatppopp",
 *   "email" : "wdv@mailinator.com",
 *   "username" : "Hallocoos",
 *   "password" : "12345678",
 *   "gender" : "male",
 *   "latitude" : <some weirdly formatted string>,
 *   "longitude" : <some weirdly formatted string>,
 *   "interests" : "male",
 *   "picture" : <base64 string>
 *   "verified" : true,
 * }
 * @apiSuccessExample {type} Success-Response:
 * // Return value may vary depending on whether an index was inserted or updated.
 * "result": {
 *   "n": 1,
 *   "nModified": 0,
 *   "upserted": [
 *     {
 *       "index": 0,
 *       "_id": "5ea837a00c98dd37783ff831"
 *     }
 *   ],
 *   "ok": 1
 * }
 */

router.post('/upsertUser', (request: Request, response: Response) => {
  const filter = { _id: ObjectID(request.body._id) };
  const query = {
    $set: {
      ...request.body.ip && { ip: request.body.ip },
      ...request.body.zip && { zip: request.body.zip },
      ...request.body.city && { city: request.body.city },
      ...request.body.region && { region: request.body.region },
      ...request.body.country && { country: request.body.country },
      ...request.body.firstname && { firstname: request.body.firstname },
      ...request.body.lastname && { lastname: request.body.lastname },
      ...request.body.email && { email: request.body.email },
      ...request.body.username && { username: request.body.username },
      ...request.body.password && { password: request.body.password },
      ...request.body.gender && { gender: request.body.gender },
      ...request.body.latitude && { latitude: request.body.latitude },
      ...request.body.longitude && { longitude: request.body.longitude },
      ...request.body.interests && { interests: request.body.interests },
      ...request.body.picture && { picture: request.body.picture },
      ...request.body.verified && { verified: request.body.verified },
    }
  };
  connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (!err) {
      const dbName = client.db(process.env.MONGO_DB);
      try {
        dbName.collection('users').updateOne(filter, query, {upsert: true}, (err, data) => {
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
  })
});

export default router;
