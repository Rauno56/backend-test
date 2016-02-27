import assert from 'assert';
import { adapter, inmemory } from '../src/dataSource';

const dataSource = adapter(inmemory);

console.log(dataSource);

describe('dataSource', () => {
  describe('#fetchUsers', () => {
    it('should return 3 users', () => {
      const users = dataSource.fetchUsers();
      assert(3, users.length);
    });
  });
});
