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
 * /api/content-types:
 *   post:
 *     summary: Create a new content type
 *     description: Generate a new Contentful content type using a JSON object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               fields:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *     responses:
 *       201:
 *         description: Content type created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/content-types', async (req: Request, res: Response) => {
  try {
    const { id, name, fields } = req.body;

    const environment = await managementClient
      .getSpace(SPACE_ID)
      .then(space => space.getEnvironment('master'));

    const contentType = await environment.createContentTypeWithId(id, {
      name,
      fields,
    });

    await contentType.publish();

    res.status(201).json({ message: 'Content type created successfully', contentType });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
