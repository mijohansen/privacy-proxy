import { dbPool } from './connection';
import { UserEntry } from '../types';

const userTableSpec = {
  name: 'users',
  fields: '',
};

const getUserByHashFromDb = async (userPiiHash: string): Promise<string | undefined> => {
  const sql = 'SELECT * FROM pp.users WHERE "piiHash"=$1';
  const res = await dbPool.query(sql, [userPiiHash]);
  if (res.rows[0]) {
    console.log(res.rows[0]);
    return res.rows[0].trackingId;
  }
};
const createNewUserInDb = async (userEntry: UserEntry) => {
  const { piiHash, trackingId } = userEntry;
  const sql = 'INSERT INTO pp.users ("piiHash","trackingId") VALUES ($1,$2)';
  const res = await dbPool.query(sql, [piiHash, trackingId]);
  console.log('createNewUserInDb', res);
};

export { getUserByHashFromDb, createNewUserInDb };
