import factory from './../../dataSource/factory';

const dataSource = factory(process.env.DATA_SOURCE);

export default async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      res.json({error: true, message: 'ID is required'});
    }

    const user = await dataSource.fetchUser(id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};
