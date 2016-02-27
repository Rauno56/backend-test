import express from 'express';
import usersRouter from './endpoints/users';

const app = express();

app.get('/', (req, res) => {
  res.json({hello: 'world'});
});

app.use('/', usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
