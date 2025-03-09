import express from 'express';
import VehicleClaimController from '../controllers/vehicleClaim.controller.js';
import VehicleClaimService from '../services/vehicleClaim.service.js';
import VehicleClaimRepository from '../repositories/vehicleClaim.repository.js';

const router = express.Router();

// Factory function to create instances
const createVehicleClaimInstances = (model = null) => {
  const repository = new VehicleClaimRepository(model);
  const service = new VehicleClaimService(repository);
  const controller = new VehicleClaimController(service);
  return controller;
};

// Instantiate controller with default model or mock for testing
const controller = createVehicleClaimInstances();

router
  .route('/')
  .get(controller.findAll.bind(controller))
  .post(controller.create.bind(controller));

router
  .route('/:id')
  .get(controller.findById.bind(controller))
  .put(controller.update.bind(controller))
  .delete(controller.delete.bind(controller));

export default router;
