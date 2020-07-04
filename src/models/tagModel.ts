import * as knex from '../../database/knex'
import { knexSelectByColumn, knexInsert, knexSelectAll, knexUpdateById, knexDeleteById } from '../services/dbService';

class Tag {
  id: string;
  userId: number;
  tag: string;
  
  constructor(data: Partial<Tag>) {
    Object.assign(this, data);
  };
	// method() {};
};

// function to handle get tags by userId
export async function retrieveTagsByUserId(userId: string): Promise<Tag> {
  const result = await knexSelectByColumn('userId', userId, 'tags');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

// function to handle get tags by tag.id
export async function retrieveTagById(id: string): Promise<Tag> {
  const result = await knexSelectByColumn('id', id, 'tags');
  if (result) {
    return (result[0]);
  } else {
    return (undefined);
  }
};

// function to handle creation of new tags
// body = { userId: 1, tag: "lovePies"}
export async function createTag(body): Promise<Tag> {
	const result = await knexInsert(body, 'tags');
	if (result) {
		return (retrieveTagById(result[0]));
	} else {
		return (undefined);
	}
};

//function to delete a tag 
//body = { userId: 1, id: 3, tag: "lovePies"}
export async function deleteTagById(body): Promise<Tag> {
  const id = body.id;
  const result = await knexDeleteById(id, 'tags');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

export default Tag;