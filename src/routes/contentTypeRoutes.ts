import { createClient as createManagementClient } from 'contentful-management';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';

dotenv.config();

const router = Router();

const SPACE_ID = process.env.SPACE_ID!;
const CMA_ACCESS_TOKEN = process.env.CMA_ACCESS_TOKEN!;

const managementClient = createManagementClient({
  accessToken: CMA_ACCESS_TOKEN,
});

/**
 * @swagger
 * /api/content-types:
 *   get:
 *     summary: Get all content types
 *     responses:
 *       200:
 *         description: List of content types
 */
router.get('/content-types', async (req: Request, res: Response) => {
  try {
    const environment = await managementClient
      .getSpace(SPACE_ID)
      .then(space => space.getEnvironment('master'));

    const contentTypes = await environment.getContentTypes();
    res.json(contentTypes.items);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

export default router;
