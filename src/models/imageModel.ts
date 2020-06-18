import { knexSelectByColumn, knexInsert, knexSelectAll, knexUpdateById } from '../services/dbService';
// delete

export async function retrieveImages() {
    const result = await knexSelectAll('images');
    if (result) {
      return (result);
    } else {
      return (undefined);
    }
  };