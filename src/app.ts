import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import contentTypeRoutes from './routes/contentTypeRoutes.js';
import createContentTypeRoute from './routes/createContentTypeRoute.js';
import entryRoutes from './routes/entryRoutes.js';
import { swaggerSpec, swaggerUi } from './swagger.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Contentful API');
});

app.use('/api/content-types', contentTypeRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api', createContentTypeRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(chalk.green(`Server running at http://localhost:${port}`));
  console.log(chalk.blue(`Swagger UI available at http://localhost:${port}/api-docs`));
});
