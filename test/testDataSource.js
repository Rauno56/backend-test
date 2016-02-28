import assert from 'assert';
import factory from '../src/dataSource/factory';

const dsFactory = factory(process.env.DATA_SOURCE);
const ds = dsFactory();

describe('dataSource', () => {
  describe('#fetchUsers', () => {
    it('should return 3 users', async () => {
      const users = await ds.fetchTopActiveUsers();
      assert(3, users.length);
    });
  });
});
