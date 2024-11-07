import dotenv from 'dotenv';
import express from 'express';
import contentTypeRoutes from './routes/contentTypeRoutes';
import { swaggerSpec, swaggerUi } from './swagger';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Contentful API');
});

app.use('/api', contentTypeRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
