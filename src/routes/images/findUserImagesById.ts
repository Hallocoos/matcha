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
 * @apiName getImages()
 * @apiDescription Finds all user's images by ID
 * @apiMethod POST
 * @apiRoute /findUserImagesById
 *
 * @apiParamFormat {type} Param Format:
 * { _id: "string"}
 * @apiParamExample {type} Param Example:
 * { _id: "" }
 * @apiSuccessExample {type} Success-Response:
 * {  }
 */

router.post('/findUserImagesById', (request: Request, response: Response) => {
    const query = { _id: request.body._id};
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
    })
});

export default router;
