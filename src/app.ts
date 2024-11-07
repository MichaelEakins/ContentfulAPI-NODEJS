import express from 'express';
import entryRoutes from './routes/entryRoutes';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Use routes for entries
app.use('/entries', entryRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
