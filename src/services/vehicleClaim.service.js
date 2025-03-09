import { NotFoundError, InternalServerError } from '../errors/index.js';

class VehicleClaimService {
  constructor(repository) {
    this.repository = repository;
  }

  async createVehicleClaim(data) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw new InternalServerError('Failed to create vehicle claim', {
        error: error.message,
      });
    }
  }

  async getVehicleClaimById(id) {
    try {
      const vehicleClaim = await this.repository.findById(id);
      if (!vehicleClaim) {
        throw new NotFoundError('Vehicle claim not found', { id });
      }
      return vehicleClaim;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError('Failed to retrieve vehicle claim', {
        error: error.message,
      });
    }
  }

  async getAllVehicleClaims(query = {}) {
    try {
      return await this.repository.findAll(query);
    } catch (error) {
      throw new InternalServerError('Failed to retrieve vehicle claims', {
        error: error.message,
      });
    }
  }

  async updateVehicleClaim(id, data) {
    try {
      const updatedClaim = await this.repository.update(id, data);
      if (!updatedClaim) {
        throw new NotFoundError('Vehicle claim not found', { id });
      }
      return updatedClaim;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError('Failed to update vehicle claim', {
        error: error.message,
      });
    }
  }

  async deleteVehicleClaim(id) {
    try {
      const deletedClaim = await this.repository.delete(id);
      if (!deletedClaim) {
        throw new NotFoundError('Vehicle claim not found', { id });
      }
      return { message: 'Vehicle claim deleted' };
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError('Failed to delete vehicle claim', {
        error: error.message,
      });
    }
  }
}

export default VehicleClaimService;
