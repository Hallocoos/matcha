import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserById, retrieveUserByUsername, User } from '../models/userModel';
import { updateUserValidator } from '../services/validation';
import { retrieveImagesByUserId } from '../models/imageModel';
import { retrieveNotificationsByReceiveId, retrieveNotificationsBySendIdAndReceiveId } from '../models/notificationModel';

const router = express.Router();

router.post('/updateUser', async (request: Request, response: Response) => {
  let errors = updateUserValidator(request);
  if (errors)
    response.send({ text: errors, success: false });
  else if (await modifyUserById(request.body))
    response.send({ text: 'User has successfully been updated.', success: true });
});

router.post('/matches', (request: Request, response: Response) => {
  response.send();
});

router.post('/profile', async (request: Request, response: Response) => {
  const user = await retrieveUserByUsername(request.body.username);
  if (user)
    var images = await retrieveImagesByUserId(user.id);
  response.send({ user: user, images: images });
});

router.post('/chat', async (request: Request, response: Response) => {
  const send = await retrieveUserByUsername(request.body.send);
  const receive = await retrieveUserByUsername(request.body.receive);
  if (send && receive)
    var notifications = await retrieveNotificationsBySendIdAndReceiveId(send.id, receive.id);
  response.send({ notifications: notifications });
});

router.post('/notifications', async (request: Request, response: Response) => {
  const user = await retrieveUserByUsername(request.body.username);
  if (user)
    var notifications = await retrieveNotificationsByReceiveId(user.id);
  response.send({ notifications: notifications });
});

// router.post('/testRoute', (request: Request, response: Response) => {
//   response.send(FILE);
// });

export default router;