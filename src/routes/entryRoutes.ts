import contentfulManagement from 'contentful-management';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';

dotenv.config();

const { createClient: createManagementClient } = contentfulManagement;

const router = Router();

const SPACE_ID = process.env.SPACE_ID!;
const CMA_ACCESS_TOKEN = process.env.CMA_ACCESS_TOKEN!;

const managementClient = createManagementClient({
  accessToken: CMA_ACCESS_TOKEN,
});

/**
 * @swagger
 * /api/entries:
 *   get:
 *     summary: Get all content entries
 *     responses:
 *       200:
 *         description: List of content entries
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const environment = await managementClient
      .getSpace(SPACE_ID)
      .then(space => space.getEnvironment('master'));

    const entries = await environment.getEntries();
    res.json(entries.items);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
