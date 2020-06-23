import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserById, retrieveUserByUsername, retrieveUserById } from '../models/userModel';
import { updateUserValidator } from '../services/validation';
import { retrieveImagesByUserId } from '../models/imageModel';
import { retrieveNotificationsByReceiveId, retrieveNotificationsBySendIdAndReceiveId } from '../models/notificationModel';
import { calculateDistance } from '../helpers/locator';

const router = express.Router();

// {"id":"2", "countryName": "South Africa", ...other...}
router.post('/updateUser', async (request: Request, response: Response) => {
  let errors = await updateUserValidator(request);
  if (errors)
    response.send({ text: errors, success: false });
  else if (await modifyUserById(request.body))
    response.send({ text: 'User has successfully been updated.', success: true });
});

// {"username": "Hallocoos"}
router.post('/profile', async (request: Request, response: Response) => {
  const user = await retrieveUserByUsername(request.body.username);
  if (user)
    var images = await retrieveImagesByUserId(user.id);
  response.send({ user: user, images: images });
});

// {"send": "Hallocoos", "receive": "asdfasdf"}
router.post('/getChat', async (request: Request, response: Response) => {
  const send = await retrieveUserByUsername(request.body.send);
  const receive = await retrieveUserByUsername(request.body.receive);
  if (send && receive)
    var notifications = await retrieveNotificationsBySendIdAndReceiveId(send.id, receive.id);
  response.send({ notifications: notifications });
});

// {"username": "Hallocoos"}
router.post('/getNotifications', async (request: Request, response: Response) => {
  const user = await retrieveUserByUsername(request.body.username);
  if (user)
    var notifications = await retrieveNotificationsByReceiveId(user.id);
  response.send({ notifications: notifications });
});

// router.post('/createNotifications', async (request: Request, response: Response) => {
//   response.send({ text: '', success: true});
// });

// router.post('/createMatch', (request: Request, response: Response) => {
//   response.send({ text: '', success: true});
// });

// router.post('/getMatches', (request: Request, response: Response) => {
//   response.send({ text: '', success: true});
// });

// { "id": 1, "max": 0, "min": 10000 }
router.post('/getSuggestions', async (request: Request, response: Response) => {
  let user = await retrieveUserById(request.body.id);
  if (user) {
    let allUsers = await calculateDistance(user);
    response.send({ matches: allUsers, text: 'Matches have been found.', success: true });
  } else
    response.send({ text: 'No matches have been found.', success: false });
});

// router.post('/setProfilePicture', (request: Request, response: Response) => {
//   response.send({ text: '', success: true});
// });

export default router;