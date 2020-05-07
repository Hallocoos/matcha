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
 * {}
 * @apiParamExample {type} Param Example:
 * {}
 * @apiSuccessExample {type} Success-Response:
 * {}
 */

router.post('/upsertImage', (request: Request, response: Response) => {
    const query = {};
    const filter = {};
    connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (!err) {
            const dbName = client.db(process.env.MONGO_DB);
            try {
                dbName.collection('images').updateOne(filter, query, (err, data) => {
                    if (err)
                        response.send(err);
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
// upsertImage - Upserts an image

export default router;
