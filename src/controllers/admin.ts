import * as express from 'express';
import { Request, Response } from 'express';
import { updateUserValidator, newNotificationValidator, newMatchValidator, idValidator } from '../services/validation';
import { modifyUserById, retrieveUserByUsername, retrieveUserById, incrementUsersFameRating, retrieveUsersByGender, retrieveUsers } from '../models/userModel';
import { addMatch, retrieveMatchByIds, retrieveMatchesById } from '../models/matchModel';
import { retrieveImagesByUserId } from '../models/imageModel';
import { retrieveNotificationsByReceiveId, retrieveNotificationsBySendIdAndReceiveId, addNotification, setNotificationsAsSeenByReceiveId } from '../models/notificationModel';
import { calculateDistance } from '../helpers/locator';
import { checkUserMatchability } from '../services/setUserAsMatchable';

const router = express.Router();

// {"id":"2", "countryName": "South Africa", ...other...}
router.post('/updateUser', async (request: Request, response: Response) => {
  let errors = await updateUserValidator(request);
  if (!errors) {
    var user = await modifyUserById(request.body);
    if (user) {
      user = await checkUserMatchability(user.id);
      response.send({ user: user, text: 'User has successfully been updated.', success: true });
    } else
    response.send({ user: user, text: 'User does not exist.', success: false });
  } else
    response.send({ text: errors, success: false });
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
  await setNotificationsAsSeenByReceiveId(user.id);
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

/*
  request.body = {
    filters: {
      // user table
      columnFilter: string,
      ageMax: integer,
      ageMin: integer,
      fameMin: integer,
      fameMax: integer,
      distanceMin: integer,
      distanceMax: integer,
      // tag table
      tags: [ cat, dog, food, apple]
    },
    sorting: {
      category: string <"age"/"fame"/"distance"/"tags">,
      direction: string <"ascending"/"descending">,
      tagsInCommon: integer,
    }
  }

  OR

  request.body = {
    filters: undefined,
    sorting: undefined
  }
*/

// { "id": 1, "max": 0, "min": 10000, category: "distance", sort: "asc" }
router.post('/getMatchRecommendations', async (request: Request, response: Response) => {
  let user = await retrieveUserById(request.body.id);
  let allUsers = await retrieveUsers();
  if (request.body.category == 'distance' && user) {
    allUsers = await calculateDistance(user, request.body.sort);
    response.send({ matches: allUsers, text: 'Matches have been found.', success: true });
  } else if (request.body.category == 'fame' && user) {
    allUsers = await retrieveUsersByGender(user.interest, user.gender, request.body.sort);
    response.send({ matches: allUsers, text: 'Matches have been found.', success: true });
  }
  //  else if (request.body.category == 'tags' && user) {
  //   let allUsers = await calculateDistance(user);
  //   response.send({ matches: allUsers, text: 'Matches have been found.', success: true });
  // } else
  //   response.send({ text: 'No matches have been found.', success: false });
  response.send({ matches: allUsers, text: 'Matches have been found.', success: true });
});

export default router;