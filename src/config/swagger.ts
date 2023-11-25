import swaggerJsdoc from 'swagger-jsdoc';

const swaggerServer = process.env.SWAGGER_SERVER;
const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'Smart Medication System',
      version: '1.0.0',
      description: 'Smart Medication System',
    },
    servers: [{ url: `${swaggerServer}/api/v1` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/docs/*.js', './src/docs/*.yml']
};

export const specs = swaggerJsdoc(options);
