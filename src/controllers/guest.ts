import { insertUser } from "../services/findUserById";
import { Router } from "express";
import { Request, Response } from 'express';
import * as express from 'express';

const router = express.Router();

router.get('/createUser', (request: Request, response: Response) => {
  // validation();
  insertUser(request.body);
});

export default router;