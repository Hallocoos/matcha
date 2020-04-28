import express from 'express';
import { Request, Response } from 'express';
import mongodb from 'mongodb';
import { connect } from 'mongodb';
import { config } from 'dotenv';
const ObjectId = require('mongodb').ObjectId;
type ObjectID = typeof import('mongodb').ObjectID;
// const util = require('util');

const router = express.Router();


export default router;