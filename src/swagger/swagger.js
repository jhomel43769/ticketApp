import swaggerJSDoc from "swagger-jsdoc.js";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TicketApp API",
    version: "1.0.0",
    description: "API documentation for TicketApp",
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
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;