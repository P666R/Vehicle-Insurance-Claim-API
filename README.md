# Vehicle Insurance Claim API

## Google drive link to answers

<https://drive.google.com/file/d/1Hth96QAiGA1qFJmcNqWEZRcQXF5He6pa/view?usp=sharing>

## Overview

This project is a RESTful API for managing vehicle insurance claims. It provides endpoints to create, retrieve, update, and delete vehicle claim records. The API is built with Node.js, Express, and MongoDB, using Mongoose for data modeling.

## Features

- **Create a Vehicle Claim**: Submit a new vehicle claim with details such as incident date, vehicle information, driver details, and claim status.
- **Retrieve Vehicle Claims**: Fetch all vehicle claims or a specific claim by ID.
- **Update a Vehicle Claim**: Modify an existing vehicle claim.
- **Delete a Vehicle Claim**: Remove a vehicle claim by ID.
- **Swagger Documentation**: Interactive API documentation available at `/api-docs`.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing vehicle claim data.
- **Mongoose**: ODM for MongoDB to define schemas and interact with the database.
- **Swagger**: API documentation using `swagger-jsdoc` and `swagger-ui-express`.
- **Zod**: Schema validation for request data.
- **Winston**: Logging library for system logs.

## Project Structure

- 📂 **vehicle\-insurance\-claim**
  - 📂 **logs**
    - 📄 [combined\-2025\-03\-10.log](logs/combined-2025-03-10.log)
    - 📄 [error\-2025\-03\-10.log](logs/error-2025-03-10.log)
    - 📄 [exceptions\-2025\-03\-10.log](logs/exceptions-2025-03-10.log)
    - 📄 [rejections\-2025\-03\-10.log](logs/rejections-2025-03-10.log)
  - 📂 **src**
    - 📄 [app.js](src/app.js)
    - 📂 **config**
      - 📄 [db.mongo.js](src/config/db.mongo.js)
      - 📄 [env.config.js](src/config/env.config.js)
      - 📄 [swagger.config.js](src/config/swagger.config.js)
    - 📂 **controllers**
      - 📄 [vehicleClaim.controller.js](src/controllers/vehicleClaim.controller.js)
    - 📂 **dtos**
      - 📄 [vehicleClaim.dto.js](src/dtos/vehicleClaim.dto.js)
    - 📂 **errors**
      - 📄 [error.factory.js](src/errors/error.factory.js)
      - 📄 [error.middleware.js](src/errors/error.middleware.js)
      - 📄 [error.types.js](src/errors/error.types.js)
      - 📄 [index.js](src/errors/index.js)
    - 📂 **middlewares**
      - 📄 [validate.dto.js](src/middlewares/validate.dto.js)
    - 📂 **models**
      - 📄 [vehicleClaim.model.js](src/models/vehicleClaim.model.js)
    - 📂 **repositories**
      - 📄 [vehicleClaim.repository.js](src/repositories/vehicleClaim.repository.js)
    - 📂 **routes**
      - 📄 [vehicleClaim.routes.js](src/routes/vehicleClaim.routes.js)
    - 📄 [server.js](src/server.js)
    - 📂 **services**
      - 📄 [vehicleClaim.service.js](src/services/vehicleClaim.service.js)
    - 📂 **utils**
      - 📄 [logger.js](src/utils/logger.js)
  - 📄 [commitlint.config.js](commitlint.config.js)
  - 📄 [eslint.config.js](eslint.config.js)
  - 📄 [package\-lock.json](package-lock.json)
  - 📄 [package.json](package.json)
  - 📄 [README.md](README.md)

## Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:P666R/Vehicle-Insurance-Claim-API.git
   cd Vehicle-Insurance-Claim-API
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables:**:

   Create a .env file in the root directory and add the following:

   ```bash
   PORT=
   NODE_ENV=
   MONGODB_URI=
   ```

4. **Start the server**:

   ```bash
   npm run dev
   ```

### API Endpoints

Base URL: /api/v1/vehicle-claims

- GET / - Retrieve all vehicle claims
- POST / - Create a new vehicle claim
- GET /:id - Retrieve a vehicle claim by ID
- PUT /:id - Update a vehicle claim by ID
- DELETE /:id - Delete a vehicle claim by ID

### API Documentation

- Access the Swagger UI at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Error Handling

- The API uses custom error classes for validation, not found, and server errors.
- Errors are logged using Winston, with stack traces included in development mode.
