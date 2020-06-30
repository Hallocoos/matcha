import * as express from 'express';
import { Request, Response } from 'express';
import { updateUserValidator, newNotificationValidator, newMatchValidator, idValidator } from '../services/validation';
import {
  modifyUserById,
  retrieveUserByUsername,
  retrieveUserById,
  incrementUsersFameRating,
  deleteUserByHash
} from '../models/userModel';
import { addMatch, retrieveMatchByIds, retrieveMatchesById } from '../models/matchModel';
import { retrieveImagesByUserId } from '../models/imageModel';
import { retrieveNotificationsByReceiveId, retrieveNotificationsBySendIdAndReceiveId, addNotification } from '../models/notificationModel';
import { calculateDistance } from '../helpers/locator';
import {reportUser} from "../helpers/email";

const router = express.Router();

// {"id":"2", "countryName": "South Africa", ...other...}
router.post('/updateUser', async (request: Request, response: Response) => {
  let errors = await updateUserValidator(request);
  if (errors)
    response.send({ text: errors, success: false });
  else {
    var user = await modifyUserById(request.body);
    response.send({ user: user, text: 'User has successfully been updated.', success: true });
  }
});

// {"username": "Hallocoos"}
router.post('/profile', async (request: Request, response: Response) => {
  const user = await retrieveUserByUsername(request.body.username);
  if (user) {
    var images = await retrieveImagesByUserId(user.id);
    await incrementUsersFameRating(user.id, 1);
    response.send({ user: user, images: images });
  } else
    response.send({ text: 'Failed to retrieve user and their associated images.', success: false });
});

// {"send": "Hallocoos", "receive": "asdfasdf"}
router.post('/getChat', async (request: Request, response: Response) => {
  const send = await retrieveUserByUsername(request.body.send);
  const receive = await retrieveUserByUsername(request.body.receive);
  if (send && receive)
    var notifications = await retrieveNotificationsBySendIdAndReceiveId(send.id, receive.id);
  response.send({ notifications: notifications, success: false });
});

// {"username": "Hallocoos"}
router.post('/getNotifications', async (request: Request, response: Response) => {
  const user = await retrieveUserByUsername(request.body.username);
  if (user)
    var notifications = await retrieveNotificationsByReceiveId(user.id);
  response.send({ notifications: notifications, success: false });
});

// { "sendId": 1, "receiveId": 2, "message": "New Message!" }
router.post('/createNotifications', async (request: Request, response: Response) => {
  let errors = newNotificationValidator(request.body);
  if (!errors) {
    let sender: any = await retrieveUserById(request.body.sendId);
    let receiver: any = await retrieveUserById(request.body.receiveId);
    if (!sender.username && !receiver.username)
      response.send({ text: 'The user you have tried to match with does not exist.', success: false });
    else {
      request.body.sender = sender.username;
      request.body.receiver = receiver.username;
      await addNotification(request.body);
      response.send({ text: 'The recipient will be notified.', success: true });
    }
  } else
    response.send({ text: errors, success: false });
});

// { "acceptId": 5, "requestId": 3 }
router.post('/createMatch', async (request: Request, response: Response) => {
  let errors = newMatchValidator(request.body);
  if (!errors) {
    let accepter: any = await retrieveUserById(request.body.acceptId);
    let requester: any = await retrieveUserById(request.body.requestId);
    let match = await retrieveMatchByIds(accepter.id, requester.id);
    if (!accepter.username && !requester.username)
      response.send({ text: 'The user you have tried to match with does not exist.', success: false });
    else if (match)
      response.send({ text: 'Users are already matched.', success: false });
    else {
      request.body.accepter = accepter.username;
      request.body.requester = requester.username;
      await incrementUsersFameRating(accepter.id, 5);
      await addMatch(request.body);
      response.send({ text: 'The recipient will be notified.', success: true });
    }
  } else
    response.send({ text: errors, success: false });
});

// { "id": 1 }
router.post('/getMatches', async (request: Request, response: Response) => {
  let errors = idValidator(request.body.id);
  if (!errors) {
    let matches = await retrieveMatchesById(request.body.id);
    response.send({ matches: matches });
  } else
    response.send({ text: 'Id is Invalid.', success: false });
});

// { userId: 1, image: <base64 string> "nhvf4qnhnhvqvfqnuhqwevfnuh", profilePicture: true }
router.post('/uploadPicture', async (request: Request, response: Response) => {
//   do error checks - let errors = idValidator(request.body.id);
//   error protection - if (!errors)
//     if (profilePicture)
//       setUserImagesToNotProfilePictures();
//     createImage(); - await addMatch(request.body);
//     send a success response - response.send({ text: 'The recipient will be notified.', success: true });
//   else
//     send error messages - response.send({ text: 'Id is Invalid.', success: false });
  response.send({ text: '', success: true });
});

// { "id": 1, "max": 0, "min": 10000 }
router.post('/getMatchRecommendations', async (request: Request, response: Response) => {
  // Distance
  let user = await retrieveUserById(request.body.id);
  if (user) {
    let allUsers = await calculateDistance(user);
    response.send({ matches: allUsers, text: 'Matches have been found.', success: true });
  } else
    response.send({ text: 'No matches have been found.', success: false });
  // Tags - create model - select * from users inner join `matches` on users.id = matches.acceptId; (Basic Query)
  // Fame rating
});
// {"id":2} -reports 'asdf'
router.post('/reportFalseAccount', async(request: Request, response: Response) => {
  let user = await retrieveUserById(request.body.id);

  if (user) {
    await reportUser(user);
    console.log("test");
    response.send({text: user.email+" has been reported.", success: true});
  } else response.send({text: "The user doesn't exist.", success: false})
});

// post -> localhost:3000/terminate/$2b$04$p6XyPrVk.Fa.3FynMArTWeRMhpGtzljhyN70kOJ8uxQJFT.ttJl2K
// should delete 'asdf'
router.post('/terminate/:hash', async(request: Request, response:Response) => {
  console.log(request.params.hash+ "\ntest")

    const user = await deleteUserByHash(request.params.hash);
  if (user)
    response.send({ text: 'User has successfully been verified.', success: true });
  else
    response.send({ text: 'User has not been verified.', success: false });
});
export default router;