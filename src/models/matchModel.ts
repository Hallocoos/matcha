import * as bcrypt from 'bcrypt';
import * as knex from '../../database/knex'
import { knexSelectByColumn, knexInsert, knexSelectAll, knexUpdateById } from '../services/dbService';
const saltRounds = 3;

class Match {
  id: string;
  requestId: string;
  acceptId: string;
  blocked: string;
  accepted: string;

  constructor(data: Partial<Match>) {
    Object.assign(this, data);
  };
  // method() {};
};

/*
 *  Function to handle getting all matches
 *  @Incoming Params: N/A
*/
export async function retrieveMatches(): Promise<Match[]> {
  const result = await knexSelectAll('matches');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle get match by requestId
 *  @Incoming Params: requestId = <string>
*/
export async function retrieveMatchByRequestId(requestId): Promise<Match> {
  const result = await knexSelectByColumn('requestId', requestId, 'matches');
  if (result[0]) {
    return (result[0]);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle get match by acceptId
 *  @Incoming Params: acceptId = <string>
*/
export async function retrieveMatchByAcceptId(acceptId): Promise<Match> {
  const result = await knexSelectByColumn('acceptId', acceptId, 'matches');
  if (result[0]) {
    return (result[0]);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle adding matches
 *  @Incoming Params: body = {
 *    acceptId  = <string>,
 *    requestId  = <string>
 *  }
*/
export async function addMatch(body) {
  if (body) {
    const result = await knexInsert(body, 'matches');
    return (result[0]);
  } else {
    return (undefined);
  }
};

/*
 *  Function to handle blocking a match
 *  @Incoming Params: body = {
 *    currId = <string>,
 *    blockId = <string>
 *  }
*/
export async function blockMatch(body) {
  return knex('matches')
    .where('acceptId', body.currId)
    .andWhere('requestId', body.blockId)
    .orWhere('acceptId', body.blockId)
    .andWhere('requestId', body.currId)
    .update('blocked', true)
    .then(function (result) {
      return result;
    });
};

/*
 *  Function to handle accepting a match
 *  @Incoming Params: body = {
 *    acceptId = <string>,
 *    requestId = <string>
 *  }
*/
export async function acceptMatch(body) {
  return knex('matches')
    .where('acceptId', body.acceptId)
    .andWhere('requestId', body.requestId)
    .update('accepted', true)
    .then(function (result) {
      return result;
    });
};

export default Match;
