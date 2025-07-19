import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TicketApp API",
    version: "1.0.0",
    description: "API documentation for TicketApp",
    contact: {
      name: "Jhomel Medina",
      email: "jhomelmedina2@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api-docs",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/swagger/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;