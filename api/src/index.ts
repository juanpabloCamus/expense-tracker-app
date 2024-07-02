import express from 'express';
import morgan from 'morgan';

import { sequelize as dbConnection } from './db';
import { operationsRouter } from './routes/operationsRouter';
import { authRouter } from './routes/authRouter';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT ?? 4321;

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRouter);
app.use('/operations', operationsRouter);

app.get('/', (_req, res) => {
  res.send('Home');
});

app.use(errorHandler);

dbConnection
  .authenticate()
  .then(() => {
    console.log('Connection with database has been established successfully.');
  })
  .then(() => {
    dbConnection.sync({ force: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
