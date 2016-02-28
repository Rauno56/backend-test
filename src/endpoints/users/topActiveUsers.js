import factory from './../../dataSource/factory';

const dataSource = factory(process.env.DATA_SOURCE);

export default async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 3;
    
    let users = await dataSource.fetchTopActiveUsers(page, perPage);
    users = await dataSource.fetchLastestListings(users);
    res.json(users);
  } catch (err)  {
    res.json(err);
  };
};
