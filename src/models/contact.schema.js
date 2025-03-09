import mongoose from 'mongoose';
import validator from 'validator';

const contactSchema = new mongoose.Schema({
  telephone: { type: String },
  mobileTelephone: {
    type: String,
    validate: {
      validator: (v) => validator.isMobilePhone(v, 'IN'),
      message: 'Invalid mobile telephone number',
    },
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
  fax: { type: String },
  homeTelephone: { type: String }, // Optional for VehicleClaim
  workTelephone: { type: String }, // Optional for VehicleClaim
});

export default contactSchema;
