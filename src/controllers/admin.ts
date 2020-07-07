import * as express from 'express';
import { Request, Response } from 'express';
import { modifyUserById, retrieveUserByUsername, retrieveUserById, incrementUsersFameRating, retrieveUsersByGender, retrieveUsers } from '../models/userModel';
import { retrieveNotificationsByReceiveId, retrieveNotificationsBySendIdAndReceiveId, addNotification, setNotificationsAsSeenByReceiveId } from '../models/notificationModel';
import { updateUserValidator, newNotificationValidator, newMatchValidator, idValidator, newImageValidator, deleteImageValidator, newTagValidator, deleteTagValidator } from '../services/validation';
import { addMatch, retrieveMatchByIds, retrieveMatchesById } from '../models/matchModel';
import { retrieveImagesByUserId, createImage, retrieveImagesByMultipleUserIds, deleteImageById } from '../models/imageModel';

import { createTag, deleteTagById, retrieveTagsByMultipleUserIds } from '../models/tagModel';
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

// {"profileId": "1", "viewerId": 2}
router.post('/profile', async (request: Request, response: Response) => {
  const userProfile = await retrieveUserById(request.body.profileId);
  if (userProfile) {
    if (request.body.viewerId) {
      const userViewer = await retrieveUserById(request.body.viewerId);
      const body = {
        sender: userViewer.username,
        receiver: userProfile.username,
        sendId: request.body.viewerId,
        receiveId: request.body.profileId,
        message: userViewer.username + ' had viewed your profile'
      }
      await addNotification(body);
      await incrementUsersFameRating(userProfile.id, 1);
    }
    var images = await retrieveImagesByUserId(userProfile.id);
    response.send({ user: userProfile, images: images });
  } else
    response.send({ text: 'Failed to retrieve user and their associated images.', success: false });
});

// {"sendId": "1", "receiveId": "2"}
router.post('/getChat', async (request: Request, response: Response) => {
  var notifications = await retrieveNotificationsBySendIdAndReceiveId(request.body.sendId, request.body.receiveId);
  response.send({ notifications: notifications, success: true });
});

// {"id": "1"}
router.post('/getNotifications', async (request: Request, response: Response) => {
  var notifications = await retrieveNotificationsByReceiveId(request.body.id);
  response.send({ notifications: notifications, success: false });
  await setNotificationsAsSeenByReceiveId(request.body.id);
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
      let body = {
        sender: requester.username,
        receiver: accepter.username,
        sendId: request.body.requestId,
        receiveId: request.body.acceptId,
        message: requester.username + ' has liked your profile'
      }
      await addNotification(body);
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
      fameMax: integer
      // ===================== Not Implemented =====================
      // , distanceMin: integer,
      // distanceMax: integer,
      // tags: [ cat, dog, food, apple]
      // ===================== Not Implemented =====================
    },
    sorting: {
      category: string <"age"/"fame"/"distance"/"tags">,
      direction: string <"ascending"/"descending">
      // ===================== Not Implemented =====================
      // , // tagsInCommon: integer,
      // ===================== Not Implemented =====================
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
  // remove blocked users and remove users that have already been matched with
  // Sort by category is specified direction
  if (request.body.sorting.direction == 'ascending')
    matchableUsers = _.sortBy(matchableUsers, request.body.sorting.category );
  else
    matchableUsers = _.sortBy(matchableUsers, request.body.sorting.category ).reverse();
  if (matchableUsers[0])
    response.send({ matches: matchableUsers, text: 'Matches have been found.', success: true });
  else
    response.send({ matches: matchableUsers, text: 'Sorry, no new matches at this time', success: false });
});

export default router;