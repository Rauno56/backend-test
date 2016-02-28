import { Router } from 'express';
import users from './users';
import topActiveUsers from './topActiveUsers';

const router = Router();

router.get('/users', users);
router.get('/topActiveUsers', topActiveUsers);

export default router;
