import { factory } from './../../dataSource';

const dsFactory = factory(process.env.DATA_SOURCE);
const ds = dsFactory();

export default async (req, res) => {
  try {
    let users = await ds.fetchTopActiveUsers();
    users = await ds.fetchLastestListings(users);
    res.json(users);
  } catch (err)  {
    res.json(err);
  };
};
