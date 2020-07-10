import * as knex from '../../database/knex'
import { knexSelectByColumn, knexInsert, knexSelectAll, knexUpdateById } from '../services/dbService';

export class Notification {
  // property: datatype;
  id: string;
  sendId: string;
  receiveId: string;
  message: string;
  createdAt: string;
  seen: string;

  constructor(data: Partial<Notification>) {
    Object.assign(this, data);
  };
  // method() {};
};

/*
 *  Function to handle getting all notifications
 *  @Incoming Params: N/A
*/
export async function retrieveNotifications(): Promise<Notification[]> {
  const result = await knexSelectAll('notifications');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle get a notifications by receiveId
 *  @Incoming Params: receiveId = <string>
*/
export async function retrieveNotificationsByReceiveId(receiveId): Promise<Notification[]> {
  const result = await knexSelectByColumn('receiveId', receiveId, 'notifications');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle get a notifications by receiveId
 *  @Incoming Params: id = <string>
*/
export async function retrieveNotificationsById(id): Promise<Notification[]> {
  const result = await knexSelectByColumn('id', id, 'notifications');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle blocking a match
 *  @Incoming Params: body = {
 *    receiveId = <string>,
 *    sendId = <string>
 *  }
*/
export async function retrieveNotificationsBySendIdAndReceiveId(sendId, receiveId):Promise<Notification[]> {
  return knex.select()
    .from('notifications')
    .where('receiveId', receiveId)
    .andWhere('sendId', sendId)
    .orWhere('receiveId', sendId)
    .andWhere('sendId', receiveId)
    .then(function (result) {
      return (result);
    });
};

/*
 *  Function to handle blocking a match
 *  @Incoming Params: body = {
 *    receiveId = <string>,
 *    sendId = <string>
 *  }
*/
export async function retrieveNotificationsByUserId(userId):Promise<Notification[]> {
  return knex.select()
    .from('notifications')
    .where('sendId', userId)
    .orWhere('receiveId', userId)
    .then(function (result) {
      return (result);
    });
};

/*
 *  Function to handle adding notifications
 *  @Incoming Params: body = {
 *    receiveId  = <string>,
 *    sendId  = <string>,
 *    message = <string>,
 *    sender = <string>,
 *    receiver = <string>
 *  }
*/
export async function addNotification(body) {
  if (body) {
    const result = await knexInsert(body, 'notifications');
    return (result);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle blocking a match
 *  @Incoming Params: body = { receiveId = <string> }
*/
export async function setNotificationsAsSeenByReceiveId(receiveId: string) {
  return knex('notifications')
    .where('receiveId', receiveId)
    .update('seen', true)
    .then(function () {
      return ;
    });
};

export default Notification;