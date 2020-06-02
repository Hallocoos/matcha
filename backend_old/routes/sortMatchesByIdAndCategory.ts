import express from 'express';
import { Request, Response } from 'express';
import mongodb from 'mongodb';
import { connect } from 'mongodb';
import { config } from 'dotenv';
const ObjectId = require('mongodb').ObjectId;
type ObjectId = typeof import('mongodb').ObjectId;
const util = require('util');

const router = express.Router();

/**
 *
 * @apiName sortMatches()
 * @apiDescription Will find all matches for a specific users ID, sort by a category and returns possible matches
 * @apiMethod POST
 * @apiRoute /sortMatchesByIdAndCategory
 *
 * @apiParamFormat {type} Param Format:
 * {}
 * @apiParamExample {type} Param Example:
 * {}
 * @apiSuccessExample {type} Success-Response:
 * {}
 */

router.post('/sortMatchesByIdAndCategory', (request: Request, response: Response) => {
  // for tags: https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/
  const query = {};
  connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (!err) {
      const dbName = client.db(process.env.MONGO_DB);
      try {
        dbName.collection('matches').find(query).toArray((err, data) => {
          if (!err && data !== undefined && data.length > 0)
            response.send(data);
          else
            response.send(err);
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
