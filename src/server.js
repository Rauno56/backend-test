import express from 'express';
import usersRouter from './endpoints/users';

const app = express();

app.use('/', usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
