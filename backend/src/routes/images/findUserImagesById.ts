import express from 'express';
import { Request, Response } from 'express';
import { connect } from 'mongodb';

const router = express.Router();

/**
 *
 * @apiName getImages()
 * @apiDescription Finds all user's images by ID
 * @apiMethod POST
 * @apiRoute /findUserImagesById
 *
 * @apiParamFormat {type} Param Format:
 * { userId: "string"}
 * @apiParamExample {type} Param Example:
 * { userId: "091v82rn09823yvrn098y" }
 * @apiSuccessExample {type} Success-Response:
 * {
 *  {
 *    _id : "5eb3d6891a29335fd7ae2e61",
 *    profilePicture : true,
 *    userId : "5e1eece605fa3d2ca82c81c8",
 *    image : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD..."
 *  },
 *  ...
 * }
 */

router.post('/findUserImagesById', (request: Request, response: Response) => {
  const query = { userId: request.body.userId };
  connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (!err) {
      const dbName = client.db(process.env.MONGO_DB);
      try {
        dbName.collection('images').find(query).toArray((err, data) => {
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
