const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port de Plaisance Russell',
      version: '1.0.0',
      description: "API de gestion des catways et des réservations du port de plaisance de Russell."
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Serveur local' }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ cookieAuth: [] }, { bearerAuth: [] }]
  },
  // Fichiers dans lesquels swagger-jsdoc va chercher les commentaires @swagger
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);