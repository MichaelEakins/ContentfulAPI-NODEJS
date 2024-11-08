import chalk from 'chalk';
import { createClient } from 'contentful';
import contentfulManagement from 'contentful-management';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';

const { createClient: createManagementClient } = contentfulManagement;

dotenv.config();

const router = Router();

const SPACE_ID = process.env.SPACE_ID!;
const CDA_ACCESS_TOKEN = process.env.CDA_ACCESS_TOKEN!;
const CMA_ACCESS_TOKEN = process.env.CMA_ACCESS_TOKEN!;

const deliveryClient = createClient({
  space: SPACE_ID,
  accessToken: CDA_ACCESS_TOKEN,
});

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
    console.log(chalk.green('Fetched content types successfully.'));
    res.json(contentTypes.items);
  } catch (error) {
    console.error(chalk.red(`Error fetching content types: ${(error as Error).message}`));
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * @swagger
 * /api/entries:
 *   get:
 *     summary: Get all content entries
 *     responses:
 *       200:
 *         description: List of content entries
 */
router.get('/entries', async (req: Request, res: Response) => {
  try {
    const entries = await deliveryClient.getEntries();
    console.log(chalk.green('Fetched entries successfully.'));
    res.json(entries.items);
  } catch (error) {
    console.error(chalk.red(`Error fetching entries: ${(error as Error).message}`));
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
