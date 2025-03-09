import mongoose from 'mongoose';
import contactSchema from './contact.schema.js';

// -- Metadata Schema --
const metadataSchema = new mongoose.Schema({
  createdBy: { type: String },
  updatedBy: { type: String },
  schemaVersion: { type: String, default: '1.0.0' },
});

// -- Third Party Schema --
const thirdPartySchema = new mongoose.Schema(
  {
    insurer: { type: String, required: true },
    reference: { type: String, required: true },
    client: { type: String },
    registration: { type: String },
    pavPayment: {
      type: String,
      enum: ['Received', 'Pending'],
    },
    pavPaymentChaseNotes: { type: String, trim: true },
    packSubmittedDate: { type: Date },
    contact: { type: contactSchema },
    metadata: { type: metadataSchema, required: true },
  },
  {
    timestamps: {
      createdAt: 'metadata.createdAt',
      updatedAt: 'metadata.updatedAt',
    },
  },
);

// -- Indexes --
thirdPartySchema.index({ insurer: 1 });
thirdPartySchema.index({ reference: 1 });

const ThirdParty = mongoose.model('ThirdParty', thirdPartySchema);

export default () => ThirdParty;
