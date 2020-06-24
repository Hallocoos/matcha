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
export async function retrieveImagesByUserId(userId: string): Promise<Image> {
  const result = await knexSelectByColumn('userId', userId, 'images');
  if (result) {
    return (result);
  } else {
    return (undefined);
  }
};

// function to handle get images by image.id
export async function retrieveImageById(id: string): Promise<Image> {
  const result = await knexSelectByColumn('id', id, 'images');
  if (result) {
    return (result[0]);
  } else {
    return (undefined);
  }
};

// function to handle creation of new images
// body = { userId: 1<int>, image: "asdojfhioqwehfvqwef"<string>};
export async function createImage(body): Promise<Image> {
  const result = await knexInsert(body, 'images');
  console.log('image created');
  return (retrieveImageById(result[0]));
};

// function to handle the setting of profile picutures
export async function setImageAsProfilePicture(body): Promise<Image> {
  const id = body.id;
  delete body.id;
  const result = await knexUpdateById(body, id, 'images')
  return (retrieveImageById(result[0]));
};

// function to handle get images by userId
// export async function deleteImageById(body): Promise<Image> {
//   const result = await knexInsert(body, 'images');
//   return (retrieveImageById(result[0]));
// };