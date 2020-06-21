import * as knex from '../../database/knex';

export function knexSelectByColumn(columnName: string, columnValue: string, targetTable: string) {
  return knex.select()
    .from(targetTable)
    .where(columnName, columnValue)
    .then(function (result) {
      console.log(result);
      return (result);
    });
};

export function knexInsert(body, targetTable) {
  return knex(targetTable)
    .insert(body)
    .then(function (result) {
      console.log(result);
      return (result);
    });
};

export function knexUpdateById(body, id, targetTable) {
  return knex(targetTable)
    .where('id', id)
    .update(body)
    .then(function (result) {
      console.log(result);
      return (result);
    });
};

export function knexSelectAll(targetTable: string) {
  return knex.select()
    .from(targetTable)
    .then(function (result) {
      console.log(result);
      return (result);
    });
};
// delete