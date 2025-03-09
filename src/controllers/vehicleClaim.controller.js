import z from 'zod';
import {
  validateCreateVehicleClaim,
  validateUpdateVehicleClaim,
} from '../dtos/vehicleClaim.dto.js';
import { ValidationError } from '../errors/index.js';

class VehicleClaimController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res, next) {
    try {
      const validatedData = validateCreateVehicleClaim(req.body);
      const newVehicleClaim =
        await this.service.createVehicleClaim(validatedData);
      res.status(201).json(newVehicleClaim);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(
          new ValidationError('Validation failed', { errors: error.errors }),
        );
      }
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const vehicleClaim = await this.service.getVehicleClaimById(
        req.params.id,
      );
      res.json(vehicleClaim);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const vehicleClaims = await this.service.getAllVehicleClaims(req.query);
      res.json(vehicleClaims);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const validatedData = validateUpdateVehicleClaim(req.body);
      const updatedVehicleClaim = await this.service.updateVehicleClaim(
        req.params.id,
        validatedData,
      );
      res.json(updatedVehicleClaim);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(
          new ValidationError('Validation failed', { errors: error.errors }),
        );
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.service.deleteVehicleClaim(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default VehicleClaimController;
