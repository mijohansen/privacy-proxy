const userTableSpec = {
  name: 'users',
  fields: '',
};

const getUserByHash = (hash: string) => {
  const query = 'SELECT * FROM users WHERE pii_hash=%1';

  return;
};

export { getUserByHash };
