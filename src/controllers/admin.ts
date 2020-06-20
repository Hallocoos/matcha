import * as express from 'express';
import { Request, Response } from 'express';
import * as validation from '../services/validation';
import { modifyUserById } from '../models/userModel';
import { verifyToken, Roles } from '../services/jwt';
import { findImagesByUserId } from '../models/imageModel';

const router = express.Router();

router.get('/updateUser', async (request: Request, response: Response) => {
  // response.send(userQueries.updateUser(request.body));
});

router.post('/updateUser', async (request: Request, response: Response) => {
  response.send(await modifyUserById(request.body));
});

router.post('/getUserImages', async (request: Request, response: Response) => {
  response.send(await findImagesByUserId(request.body.userId));
  // POST - request.body
  // GET - request.params
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;