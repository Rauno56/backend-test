import { assert } from 'chai';
import factory from '../src/dataSource/factory';

const dataSource = factory(process.env.DATA_SOURCE);

describe('dataSource', () => {
  describe('#fetchTopActiveUsers', () => {
    it('should return the top active users', async () => {
      const users = await dataSource.fetchTopActiveUsers();
      assert.equal(users.length, 3);
    });
  });

  describe('#fetchLastestListings', () => {
    it('should fill users with their lastest listings', async () => {
      let users = await dataSource.fetchTopActiveUsers();
      users = await dataSource.fetchLastestListings(users);
      assert.equal(users.length, 3);

      users.forEach(user => {
        assert.isDefined(user.listings);
      });
    });
  });

  describe('#fetchUser', () => {
    it('should fetch user by id', async () => {
      const user = await dataSource.fetchUser(1);
      assert.equal(user.id, 1);
    });
  });
});
