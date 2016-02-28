import { assert } from 'chai';
import factory from '../src/dataSource/factory';


const dsFactory = factory(process.env.DATA_SOURCE);
const ds = dsFactory();

describe('dataSource', () => {
  describe('#fetchTopActiveUsers', () => {
    it('should return the top active users', async () => {
      const users = await ds.fetchTopActiveUsers();
      assert.equal(users.length, 3);
    });
  });

  describe('#fetchLastestListings', () => {
    it('should fill users with their lastest listings', async () => {
      let users = await ds.fetchTopActiveUsers();
      users = await ds.fetchLastestListings(users);
      assert.equal(users.length, 3);

      users.forEach(user => {
        assert.isDefined(user.listings);
      });
    });
  });
});
