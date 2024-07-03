import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { sequelize as dbConnection } from './db';
import { operationsRouter } from './routes/operationsRouter';
import { authRouter } from './routes/authRouter';
import { errorHandler } from './middlewares/errorHandler';
import { auth } from './middlewares/authMiddleware';

const app = express();
dotenv.config();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRouter);

// Auth
app.use(auth);

// Protected Routes
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
    dbConnection.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
