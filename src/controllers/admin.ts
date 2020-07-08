import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserById, retrieveUserByUsername, retrieveUserById, incrementUsersFameRating, retrieveUsersByGender, retrieveUsers } from '../models/userModel';
import { retrieveNotificationsByReceiveId, retrieveNotificationsBySendIdAndReceiveId, addNotification, setNotificationsAsSeenByReceiveId } from '../models/notificationModel';
import { updateUserValidator, newNotificationValidator, newMatchValidator, idValidator, newImageValidator, deleteImageValidator, newTagValidator, deleteTagValidator } from '../services/validation';
import { addMatch, retrieveMatchByIds, retrieveMatchesByUserId, blockMatch } from '../models/matchModel';
import { retrieveImagesByUserId, createImage, retrieveImagesByMultipleUserIds, deleteImageById } from '../models/imageModel';

import { createTag, deleteTagById, retrieveTagsByMultipleUserIds, retrieveTagsByUserId } from '../models/tagModel';
import { calculateDistance } from '../helpers/locator';
import { checkUserMatchability } from '../services/setUserAsMatchable';
import * as _ from 'underscore';

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
    const images = await retrieveImagesByUserId(user.id);
    const tags = await retrieveTagsByUserId(user.id);
    await incrementUsersFameRating(user.id, 1);
    response.send({ user: user, images: images, tags: tags });
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
    let matches = await retrieveMatchesByUserId(request.body.id);
    response.send({ matches: matches });
  } else
    response.send({ text: 'Id is Invalid.', success: false });
});

// { userId: 1, image: <base64 string> "nhvf4qnhnhvqvfqnuhqwevfnuh", profilePicture: false }
router.post('/uploadPicture', async (request: Request, response: Response) => {
  let errors = await newImageValidator(request.body);
  if (!errors) {
    await createImage(request.body);
    response.send({ text: 'Image successfully uploaded.', success: true });
  } else
    response.send({ text: errors, success: false });
});

// { "id": "1" }
router.post('/deletePicture', async (request: Request, response: Response) => {
  let errors = await deleteImageValidator(request.body);
  if (!errors) {
    await deleteImageById(request.body);
    response.send({ text: 'Image successfully deleted.', success: true });
  } else
    response.send({ text: errors, success: false });
});

router.post('/createTag', async (request: Request, response: Response) => {
  let errors = await newTagValidator(request.body);
  if (!errors) {
    await createTag(request.body);
    response.send({ text: 'Tag Successfully created.', success: true });
  } else
    response.send({ text: errors, success: false });
});

router.post('/deleteTag', async (request: Request, response: Response) => {
  let errors = await deleteTagValidator(request.body);
  if (!errors) {
    await deleteTagById(request.body);
    response.send({ text: 'Tag successfully deleted.', success: true });
  } else
    response.send({ text: errors, success: false });
});

/*
  id: 1,
  request.body = {
    filters: {
      ageMax: integer,
      ageMin: integer,
      fameMin: integer,
      fameMax: integer,
      distanceMin: integer,
      distanceMax: integer,
      ===================== Not Implemented =====================
      tags: [ cat, dog, food, apple]
      ===================== Not Implemented =====================
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
router.post('/getMatchRecommendations', async (request: Request, response: Response) => {
  let user = await retrieveUserById(request.body.id);
  let matchableUsers = await retrieveUsersByGender(request.body.filters, request.body.id, user.interest, user.gender);
  // Distance Calculations
  matchableUsers = await calculateDistance(user, request.body.sort, matchableUsers);
  // Adding tags to user Objects
  var userIds = new Array;
  var j, i;
  for (i = 0; matchableUsers[i]; i++) {
    userIds.push(matchableUsers[i].id);
    matchableUsers[i].tags = new Array;
  }
  // Append Tags to users
  let userTags = await retrieveTagsByMultipleUserIds(userIds);
  for (i = 0; matchableUsers[i]; i++) {
    for (j = 0; userTags[j]; j++) {
      if (matchableUsers[i].id == userTags[j].userId) {
        matchableUsers[i].tags.push(userTags[j].tag);
      }
    }
  }
  var k, count;
  count = 0;
  var adminTags = await retrieveTagsByUserId(request.body.id)
  for (i = 0; matchableUsers[i]; i++) {
    matchableUsers[i].tagCount = new Array;
    for (j = 0; matchableUsers[i].tags[j]; j++) {
      for (k = 0; adminTags[k]; k++) {
        if (adminTags[k].tag.toLowerCase() == matchableUsers[i].tags[j].toLowerCase())
          count += 1;
      }
    }
    matchableUsers[i].tagCount.push(count);
    count = 0;
  }
  // Append Images to users
  for (i = 0; matchableUsers[i]; i++) {
    userIds.push(matchableUsers[i].id);
    matchableUsers[i].images = new Array;
  }
  let userImages = await retrieveImagesByMultipleUserIds(userIds);
  for (i = 0; matchableUsers[i]; i++) {
    for (j = 0; userImages[j]; j++) {
      if (matchableUsers[i].id == userImages[j].userId) {
        matchableUsers[i].images.push(userImages[j].image);
      }
    }
  }
  // Find all matches related to loggin in user
  let matches = await retrieveMatchesByUserId(user.id);
  // Filters out all matches where blocked and accepted !== 1
  matches = matches.filter(obj => (
    obj.accepted == 1 || obj.blocked == 1));
  // Removes all users that have been blocked or have already accepted a match with the logged in user.
  for (j = 0; matches[j]; j++) {
    matchableUsers = matchableUsers.filter(obj => (
      obj.id !== matches[j].acceptId && obj.id !== matches[j].requestId));
  }
  // Sort by category is specified direction
  if (request.body.sorting.direction == 'ascending')
    matchableUsers = _.sortBy(matchableUsers, request.body.sorting.category);
  else
    matchableUsers = _.sortBy(matchableUsers, request.body.sorting.category).reverse();
  // Filter out users by distance
  let distanceMin = request.body.filters.distanceMin || 0;
  let distanceMax = request.body.filters.distanceMax || 10000;
  matchableUsers = matchableUsers.filter(obj => (
    obj.distance >= distanceMin && obj.distance <= distanceMax));
  // Count similar tags
  var tagsInCommon = request.body.sorting.tagsInCommon || 0;
  // Filter out by amount of correlation tags
  matchableUsers = matchableUsers.filter(obj => (
    obj.tagCount[0] >= tagsInCommon));
  // Determine reponse based on whether any users still exist after filtering
  if (matchableUsers[0])
    response.send({ matches: matchableUsers, text: 'Matches have been found.', success: true });
  else
    response.send({ text: 'No matches have been found.', success: false });
});

/*
  Routes find the match between 2 id's and set's the match as blocked.
  request.body = {
    "acceptId": 1,
    "requestId": 2
  }
*/
router.post('/blockMatch', async (request: Request, response: Response) => {
  const sender = await retrieveUserById(request.body.requestId);
  const receiver = await retrieveUserById(request.body.acceptId);;
  await blockMatch(request.body.acceptId, request.body.requestId);
  let body = {
    sender: sender.username,
    receiver: receiver.username,
    sendId: sender.id,
    receiveId: receiver.id,
    message: sender.username + ' has blocked you'
  }
  await addNotification(body);
  response.send({ text: 'User has been blocked.', success: true });
});


export default router;