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

//delete