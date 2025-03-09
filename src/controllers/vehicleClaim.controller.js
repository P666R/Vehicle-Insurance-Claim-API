import {
  validateCreateVehicleClaim,
  validateUpdateVehicleClaim,
} from '../dtos/vehicleClaim.dto.js';

class VehicleClaimController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res) {
    try {
      const validatedData = validateCreateVehicleClaim(req.body);
      const newVehicleClaim =
        await this.service.createVehicleClaim(validatedData);
      res.status(201).json(newVehicleClaim);
    } catch (error) {
      res.status(400).json({ message: error.message, errors: error.errors });
    }
  }

  async findById(req, res) {
    try {
      const vehicleClaim = await this.service.getVehicleClaimById(
        req.params.id,
      );
      res.json(vehicleClaim);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const vehicleClaims = await this.service.getAllVehicleClaims(req.query);
      res.json(vehicleClaims);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const validatedData = validateUpdateVehicleClaim(req.body);
      const updatedVehicleClaim = await this.service.updateVehicleClaim(
        req.params.id,
        validatedData,
      );
      res.json(updatedVehicleClaim);
    } catch (error) {
      res.status(400).json({ message: error.message, errors: error.errors });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.service.deleteVehicleClaim(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default VehicleClaimController;
