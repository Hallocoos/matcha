import * as express from 'express';
import { Request, Response } from 'express';
import { insertUser } from "../services/findUserById";

const router = express.Router();

router.post('/createUser', (request: Request, response: Response) => {
  // validation();
  response.send(insertUser(request.body));
});

router.get('/login', (request: Request, response: Response) => {
  response.send();
});

router.get('/home', (request: Request, response: Response) => {
  response.send();
});

export default router;