import factory from './../../dataSource/factory';

const dataSource = factory(process.env.DATA_SOURCE);

export default async (req, res) => {
  try {
    let users = await dataSource.fetchTopActiveUsers();
    users = await dataSource.fetchLastestListings(users);
    res.json(users);
  } catch (err)  {
    res.json(err);
  };
};
