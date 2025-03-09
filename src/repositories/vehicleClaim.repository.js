import VehicleClaim from '../models/vehicleClaim.model.js';

class VehicleClaimRepository {
  constructor(model = VehicleClaim) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findAll(query = {}) {
    return this.model.find(query);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default VehicleClaimRepository;
