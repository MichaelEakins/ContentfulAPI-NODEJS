import { createClient } from 'contentful';
import { createClient as createManagementClient } from 'contentful-management';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
dotenv.config();

const router = Router();

const SPACE_ID = 'your_space_id';
const CDA_ACCESS_TOKEN = 'your_cda_access_token';
const CMA_ACCESS_TOKEN = 'your_cma_access_token';

const deliveryClient = createClient({
  space: SPACE_ID,
  accessToken: CDA_ACCESS_TOKEN,
});

const managementClient = createManagementClient({
  accessToken: CMA_ACCESS_TOKEN,
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const entries = await deliveryClient.getEntries();
    res.json(entries.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const environment = await managementClient
      .getSpace(SPACE_ID)
      .then(space => space.getEnvironment('master'));

    const entry = await environment.createEntry('your_content_type_id', {
      fields: {
        title: { 'en-US': req.body.title },
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
