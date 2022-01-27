import LRUCache from 'lru-cache';

interface UserEntry {
  user_id: string;
}

const options = {
  max: 10000,
};

const createUserMap = () => {
  return new LRUCache(options);
};

export { createUserMap, UserEntry };
