import { Router } from 'express';
import users from './users';
import topActiveUsers from './topActiveUsers';

const r = Router();

r.get('/users', users);
r.get('/topActiveUsers', topActiveUsers);

export default r;
