class VehicleClaimService {
  constructor(repository) {
    this.repository = repository;
  }

  async createVehicleClaim(data) {
    return this.repository.create(data);
  }

  async getVehicleClaimById(id) {
    const vehicleClaim = await this.repository.findById(id);
    if (!vehicleClaim) throw new Error('Vehicle claim not found');
    return vehicleClaim;
  }

  async getAllVehicleClaims(query = {}) {
    return this.repository.findAll(query);
  }

  async updateVehicleClaim(id, data) {
    const updatedClaim = await this.repository.update(id, data);
    if (!updatedClaim) throw new Error('Vehicle claim not found');
    return updatedClaim;
  }

  async deleteVehicleClaim(id) {
    const deletedClaim = await this.repository.delete(id);
    if (!deletedClaim) throw new Error('Vehicle claim not found');
    return { message: 'Vehicle claim deleted' };
  }
}

export default VehicleClaimService;
