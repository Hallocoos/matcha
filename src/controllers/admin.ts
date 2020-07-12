import * as express from 'express';
import { Request, Response } from 'express';
import { updateUserValidator, newNotificationValidator, newMatchValidator, idValidator, newImageValidator, deleteImageValidator, newTagValidator, deleteTagValidator, profilePictureExists } from '../services/validation';
import { modifyUserById, retrieveUsersByGender, retrieveUserById, incrementUsersFameRating, retrieveUserByHash, deleteUsersImagesById, deleteUsersMatchesById, deleteUsersNotificationsById, deleteUserByHash, deleteUsersTagsById } from '../models/userModel';
import {
  retrieveNotificationsByReceiveId,
  retrieveNotificationsBySendIdAndReceiveId,
  addNotification,
  setNotificationsAsSeenByReceiveId,
  setNotificationsAsSeenBySendId,
  retrieveNotifications,
  retrieveAllNotificationsByUserId,
  retrieveAllNewNotificationsByUserId
} from '../models/notificationModel';
import {
  addMatch,
  retrieveMatchByIds,
  blockMatch,
  acceptMatch,
  retrieveMatchesByUserId,
  retrieveMatchByAcceptId, retrieveMatches
} from '../models/matchModel';
import { retrieveImagesByUserId, createImage, retrieveImagesByMultipleUserIds, deleteImageById } from '../models/imageModel';
import { createTag, deleteTagById, retrieveTagsByMultipleUserIds, retrieveTagsByUserId, retrieveTagsByMultipleTagValues } from '../models/tagModel';
import { calculateDistance } from '../helpers/locator';
import { reportUser } from "../helpers/email";
import { checkUserMatchability } from '../services/setUserAsMatchable';
import * as _ from 'underscore';
import { filter } from 'lodash';

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
  console.log(request.body)
  if (userProfile) {
    if (request.body.viewerId) {
      let match = await retrieveMatchByIds(request.body.viewerId, userProfile.id);
      if (match) {
        if (userProfile.id == match.acceptId) {
          userProfile.blockable = 1;
        } else if (userProfile.id == match.requestId) {
          userProfile.createMatch = 1;
          userProfile.blockable = 1;
        }
      } else {
        userProfile.swipeable = 1;
        userProfile.blockable = 1;
      }
      const userViewer = await retrieveUserById(request.body.viewerId);
      const body = {
        sender: userViewer.username,
        receiver: userProfile.username,
        sendId: request.body.viewerId,
        receiveId: request.body.profileId,
        //message must be useable both ways e.g. user "viewed" you and you "viewed" target_user.
        message: 'viewed'
      }
      await addNotification(body);
      await incrementUsersFameRating(userProfile.id, 1);
    }
    const tags = await retrieveTagsByUserId(userProfile.id);
    const images = await retrieveImagesByUserId(userProfile.id);
    response.send({ user: userProfile, images: images, tags: tags });
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
  const user = await retrieveUserById(request.body.id);
  if (user) {
    var notifications = await retrieveAllNotificationsByUserId(user.id);
    response.send({ notifications: notifications, success: true });
  } else
    response.send({ success: false });
});

// {"id": "1"}
router.post('/getNumberOfUnreadNotifications', async (request: Request, response: Response) => {
  const user = await retrieveUserById(request.body.id);
  var i;
  var count = 0;
  if (user) {
    var notifications = await retrieveAllNewNotificationsByUserId(user.id);
    for (i = 0; notifications[i]; i++) {
      count++;
    }
    response.send({ number: count, success: true });
  } else
    response.send({ success: false });
})

// {"id": "1"}
router.post('/setNotificationsAsSeen', async (request: Request, response: Response) => {
  await setNotificationsAsSeenByReceiveId(request.body.id);
  await setNotificationsAsSeenBySendId(request.body.id);
  response.send({ success: true });
});


// { "sendId": 1, "receiveId": 2, "message": "New Message!" }
router.post('/createNotifications', async (request: Request, response: Response) => {
  let errors = newNotificationValidator(request.body);
  if (!errors) {
    let sender: any = await retrieveUserById(request.body.sendId);
    let receiver: any = await retrieveUserById(request.body.receiveId);
    if (!sender.username && !receiver.username) {
      response.send({ text: 'The user you have tried to match with does not exist.', success: false });
    } else {
      request.body.sender = sender.username;
      request.body.receiver = receiver.username;
      let matches = await retrieveMatchByIds(request.body.receiveId, request.body.sendId);
      console.log(matches);
      if (matches.blocked == '1') {
        response.send({ text: 'The user you have tried to match with does not exist.', success: false });
        return;
      } await addNotification(request.body)
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
    else if (match && match.acceptId === requester.id && match.requestId === accepter.id) {
      await acceptMatch(accepter.id, requester.id);
      let body = {
        sender: accepter.username,
        receiver: requester.username,
        sendId: accepter.id,
        receiveId: requester.id,
        message: 'liked back:,'
      }
      await addNotification(body);
      await incrementUsersFameRating(accepter.id, 5);
      response.send({ text: 'Users have been matched.', success: true });
    } else if (match && match.acceptId === accepter.id && match.requestId === requester.id) {
      response.send({ text: 'Users have already been suggested to match.', success: false });
    } else {
      request.body.accepter = accepter.username;
      request.body.requester = requester.username;
      await incrementUsersFameRating(accepter.id, 5);
      await addMatch(request.body);
      let body = {
        sender: requester.username,
        receiver: accepter.username,
        sendId: request.body.requestId,
        receiveId: request.body.acceptId,
        message: 'liked'
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

// { "userId": 1, "tag": "food"}
router.post('/createTag', async (request: Request, response: Response) => {
  let errors = await newTagValidator(request.body);
  if (!errors) {
    await createTag(request.body);
    response.send({ text: 'Tag Successfully created.', success: true });
  } else
    response.send({ text: errors, success: false });
});

// { "id": 1}
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
      tags: [ cat, dog, food, apple]
    },
    sorting: {
      category: string <"age"/"fame"/"distance"/"tagsInCommon">,
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
  var j, i;
  if (!user.matchable)
    response.send({ text: "Please make sure that all information in your profile is filled out, in order for you to match with other users.", success: false });
  else {
    if (request.body.filters.tags && request.body.filters.tags[0]) {
      var tags = await retrieveTagsByMultipleTagValues(request.body.filters.tags);
      var matchableUsers = await retrieveUsersByGender(request.body.filters, request.body.id, user.interest, user.gender);
      let recommendedUsers = [];
      for (i = 0; matchableUsers[i]; i++) {
        for (j = 0; tags[j]; j++) {
          if (matchableUsers[i].id == tags[j].userId)
            recommendedUsers.push(matchableUsers[i]);
        }
      }
      matchableUsers = recommendedUsers;
      console.log('matchableUsers: ', matchableUsers);
    } else
      var matchableUsers = await retrieveUsersByGender(request.body.filters, request.body.id, user.interest, user.gender);
    // Distance Calculations
    matchableUsers = await calculateDistance(user, request.body.sort, matchableUsers);
    // Adding tags to user Objects
    var userIds = new Array;
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
      matchableUsers[i].tagsInCommon = new Array;
      for (j = 0; matchableUsers[i].tags[j]; j++) {
        for (k = 0; adminTags[k]; k++) {
          if (adminTags[k].tag.toLowerCase() == matchableUsers[i].tags[j].toLowerCase())
            count += 1;
        }
      }
      matchableUsers[i].tagsInCommon.push(count);
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
        if (matchableUsers[i].id == userImages[j].userId && userImages[j].profilePicture) {
          matchableUsers[i].images.push(userImages[j].image);
        }
      }
    }
    // Find all matches related to loggin in user
    let matches = await retrieveMatchesByUserId(user.id);
    // Filters out all matches where blocked and accepted == 0
    matches = matches.filter(obj => (
      obj.accepted == 1 || obj.blocked == 1));
    // Removes all users that have been blocked or have already accepted a match with the logged in user.
    for (j = 0; matches[j]; j++) {
      matchableUsers = matchableUsers.filter(obj => (
        obj.id !== matches[j].acceptId && obj.id !== matches[j].requestId));
    }
    // Find all matches related to loggin in user
    matches = await retrieveMatchesByUserId(user.id);
    // Filters out all matches where blocked and accepted == 1
    matches = matches.filter(obj => (
      !obj.accepted && !obj.blocked));
    // set Matchable user as blockable, matchable or swipeable based on match history with logged in user
    for (i = 0; matchableUsers[i]; i++) {
      matchableUsers[i].createMatch = 0;
      matchableUsers[i].blockable = 0;
      matchableUsers[i].swipeable = 0;
      for (j = 0; matches[j]; j++) {
        if (matchableUsers[i].id == matches[j].acceptId) {
          matchableUsers[i].blockable = 1;
        } else if (matchableUsers[i].id == matches[j].requestId) {
          matchableUsers[i].createMatch = 1;
          matchableUsers[i].blockable = 1;
        }
      }
      if (!matchableUsers[i].createMatch && !matchableUsers[i].blockable) {
        matchableUsers[i].swipeable = 1;
        matchableUsers[i].blockable = 1;
      }
    }
    // Filter out users by distance
    let distanceMin = request.body.filters.distanceMin || 0;
    let distanceMax = request.body.filters.distanceMax || 10000;
    matchableUsers = matchableUsers.filter(obj => (
      obj.distance >= distanceMin && obj.distance <= distanceMax));
    // Count similar tags
    var tagsInCommon = request.body.sorting.tagsInCommon || 0;
    // Filter out by amount of correlation tags
    matchableUsers = matchableUsers.filter(obj => (
      obj.tagsInCommon[0] >= tagsInCommon));
    // Sort by category is specified direction
    if (request.body.sorting.direction == 'ascending')
      matchableUsers = _.sortBy(matchableUsers, request.body.sorting.category);
    else
      matchableUsers = _.sortBy(matchableUsers, request.body.sorting.category).reverse();
    // Determine reponse based on whether any users still exist after filtering
    if (matchableUsers[0])
      response.send({ matches: matchableUsers, text: 'Matches have been found.', success: true });
    else
      response.send({ text: 'No matches have been found.', success: false });
  }
});
// {"id":2} -reports 'asdf'
router.post('/reportFalseAccount', async (request: Request, response: Response) => {
  let user = await retrieveUserById(request.body.id);

  if (user) {
    await reportUser(user);
    response.send({ text: "The user has been reported.", success: true });
  } else response.send({ text: "The user doesn't exist.", success: false })
});

// post -> localhost:3000/terminate/$2b$04$p6XyPrVk.Fa.3FynMArTWeRMhpGtzljhyN70kOJ8uxQJFT.ttJl2K
// should delete 'asdf'
router.post('/terminate/:hash', async (request: Request, response: Response) => {
  const user = await retrieveUserByHash(request.params.hash);

  if (user) {
    await deleteUsersImagesById(user.id)
    await deleteUsersMatchesById(user.id)
    await deleteUsersNotificationsById(user.id)
    await deleteUsersTagsById(user.id)
    await deleteUserByHash(user.hash)
    response.send({ text: 'User has been deleted.', success: true });
  }
  else
    response.send({ text: 'User has not been deleted.', success: false });
});

/*
  Routes find the match between 2 id's and set's the match as blocked.
  request.body = {
    acceptId: 1,
    requestId: 2
  }
*/
router.post('/blockMatch', async (request: Request, response: Response) => {
  const sender = await retrieveUserById(request.body.requestId);
  const receiver = await retrieveUserById(request.body.acceptId);;
  const result = await blockMatch(request.body.acceptId, request.body.requestId);
  if (!result) {
    await addMatch({
      acceptId: request.body.acceptId,
      requestId: request.body.requestId,
      accepter: receiver.username,
      requester: sender.username,
      blocked: 1,
    });
  }
  let body = {
    sender: sender.username,
    receiver: receiver.username,
    sendId: sender.id,
    receiveId: receiver.id,
    message: 'blocked'
  }
  await addNotification(body);
  response.send({ text: 'User has been blocked.', success: true });
});

export default router;