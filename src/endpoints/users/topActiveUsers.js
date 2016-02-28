import factory from './../../dataSource/factory';

const ds = factory(process.env.DATA_SOURCE)();

export default async (req, res) => {
  try {
    let users = await ds.fetchTopActiveUsers();
    users = await ds.fetchLastestListings(users);
    res.json(users);
  } catch (err)  {
    res.json(err);
  };
};
