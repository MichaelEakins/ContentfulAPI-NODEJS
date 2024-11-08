import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contentful API',
      version: '1.0.0',
      description: 'API documentation for interacting with Contentful',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Focus on source TypeScript files
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };

