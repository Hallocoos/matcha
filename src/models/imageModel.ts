import * as knex from '../../database/knex'
import { knexSelectByColumn, knexInsert, knexSelectAll, knexUpdateById } from '../services/dbService';

class Image {
  id: string;
  profilePicture: true;
  userId: number;
  image: string;

  constructor(data: Partial<Image>) {
    Object.assign(this, data);
  };
  // method() {};
};

// function to handle get images by userId
export async function findImagesByUserId(userId: string): Promise<Image> {
  // Select by column id, where id = userId, from table images.
  const result = await knexSelectByColumn('userId', userId, 'images');
  // result = array of [ images ];
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

//delete