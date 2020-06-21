import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserById } from '../models/userModel';
import { updateUserValidator } from '../services/validation';

const router = express.Router();

router.post('/updateUser', async (request: Request, response: Response) => {
  let errors = updateUserValidator(request);
  if (errors)
    response.send({ text: errors, success: false });
  else
    if (await modifyUserById(request.body))
      response.send({ text: 'User has successfully been updated.', success: true });
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;