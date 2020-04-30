import express from 'express';
import { Request, Response } from 'express';
import { connect } from 'mongodb';
const ObjectID = require('mongodb').ObjectID;
type ObjectID = typeof import('mongodb').ObjectID;
const router = express.Router();

/**
 *
 * @apiName findUserById(_id)
 * @apiDescription Finds all user details by ID, removes Password from the return object
 * @apiMethod POST
 * @apiRoute /findUserById
 *
 * @apiParamFormat {type} Param Format:
 * { _id: <string> }
 * @apiParamExample {type} Param Example:
 * { _id: '5e1eece605fa3d2ca82c81c8'}
 * @apiSuccessExample {type} Success-Response:
 * {
 *   'verified' : true,
 *   'interests' : 'male',
 *   'ip' : '197.229.4.202',
 *   'country_name' : 'South Africa',
 *   'region_name' : 'Western Cape',
 *   'city' : 'Cape Town',
 *   'zip_code' : '7945',
 *   'longitude' : '',
 *   'latitude' : '',
 *   'firstname' : 'Hallocoos',
 *   'lastname' : 'Cuatppopp',
 *   'email' : 'wdv@mailinator.com',
 *   'username' : 'Hallocoos',
 *   'gender' : 'male' 
 * }
 */

router.post('/findUserById', (request: Request, response: Response) => {
  const query = 
  [{
    $match:
      { _id: ObjectID(request.body._id) }
  }, {
    $project:
      { picture: 0, _id: 0, password: 0 }
  }]
  connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (!err) {
          const dbName = client.db(process.env.MONGO_DB);
          try {
              dbName.collection('users').aggregate((query)).toArray((err, data) => {
                if (!err && data !== undefined && data.length > 0)
                    response.send(data);
                else
                    response.send(err);
            }); 
          } catch (e) {
              response.send(e);
          }
      }
  })
})

export default router;