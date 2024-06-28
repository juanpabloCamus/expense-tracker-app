import express from 'express';
import morgan from 'morgan';

import { sequelize as dbConnection } from './db';

const app = express()
const PORT = process.env.PORT ?? 1234;

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_req, res) => {
  res.send('Home')})

dbConnection.authenticate().then(() => {
  console.log('Connection with database has been established successfully.');
  console.log(dbConnection.models)
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

dbConnection.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
  })
})