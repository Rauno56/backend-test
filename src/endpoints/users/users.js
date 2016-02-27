import { adapter, postgresql } from './../../dataSource';

const dataSource = adapter(postgresql);

export default (req, res) => {
  res.json(dataSource.fetchUsers());
};
