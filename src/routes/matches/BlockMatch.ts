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
 * @apiName blockMatch()
 * @apiDescription Sets a boolean value in currently matched duo that represents that they can no longer be matched and can't talk
 * @apiMethod POST
 * @apiRoute /BlockMatch
 * @apiParamFormat {type} Param Format:
 * {}
 * @apiParamExample {type} Param Example:
 * {}
 * @apiSuccessExample {type} Success-Response:
 * {}
 */

router.post('/BlockMatch', (request: Request, response: Response) => {
    const filter = {};
    const query = {};
    connect(`mongodb://${process.env.MONGO_DB_URL}:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (!err) {
            const dbName = client.db(process.env.MONGO_DB);
            try {
                dbName.collection('matches').updateOne(filter, query, (err, data) => {
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

export default router;
