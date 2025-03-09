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

router.post('/', controller.create.bind(controller));
router.get('/:id', controller.findById.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
