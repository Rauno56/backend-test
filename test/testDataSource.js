import assert from 'assert';
import factory from '../src/dataSource/factory';

const dataSourceFactory = factory(process.env.DATA_SOURCE);
const dataSource = dataSourceFactory();

describe('dataSource', () => {
  describe('#fetchUsers', () => {
    it('should return 3 users', () => {
      const users = dataSource.fetchUsers();
      assert(3, users.length);
    });
  });
});
