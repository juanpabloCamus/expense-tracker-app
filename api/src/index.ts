import express from 'express';
import morgan from 'morgan';

const app = express()
const PORT = process.env.PORT ?? 1234;

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_req, res) => {
  res.send('Home')
})

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})