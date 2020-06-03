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
 * @apiName upsertImage()
 * @apiDescription Upserts an image
 * @apiMethod POST
 * @apiRoute /upsertImage
 *
 * @apiParamFormat {type} Param Format:
 * {
 *     _id: <string>
 *     userId: <string>,
 *     profilePicture: boolean,
 *     image: <base64 string>
 * }
 * @apiParamExample {type} Param Example:
 * {
 *     _id: "5eb3d6891a29335fd7ae2e61",
 *     userId: "091v82rn09823yvrn098y",
 *     profilePicture: true,
 *     image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD..."
 * }
 * @apiSuccessExample {type} Success-Response:
 * {}
 */

router.post('/upsertImage', (request: Request, response: Response) => {
  if (!request.body._id) {
    request.body._id = new ObjectId();
  }
  const query = {
    $set: {
      ...request.body.userId && { userId: request.body.userId },
      ...request.body.image && { image: request.body.image },
      ...request.body.profilePicture && { profilePicture: request.body.profilePicture },
    }
  };
  const filter = { _id: ObjectId(request.body._id) };
  connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (!err) {
      const dbName = client.db(process.env.MONGO_DB);
      try {
        dbName.collection('images').updateOne(filter, query, { upsert: true }, (err, data) => {
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
