import * as express from 'express';
import { Request, Response } from 'express';
import * as validation from '../services/validation';
import { modifyUser } from '../models/userModel';
import { verifyToken, Roles } from '../services/jwt';

const router = express.Router();


router.get('/updateUser', (request: Request, response: Response) => {
  // response.send(userQueries.updateUser(request.body));
});

router.post('/updateUser', async (request: Request, response: Response) => {
  response.send( await modifyUser(request.body));
});

// router.post('/findAllUsers', verifyToken(Roles.Admin), async (request: Request, response: Response) => {
//   const user = new User( await );
//   response.send(user);
// });

// router.post('/findUserById', async (request: Request, response: Response) => {
//   const user = new User( await );
//   response.send(user);
// });

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;