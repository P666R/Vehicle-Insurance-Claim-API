import mongoose from 'mongoose';
import contactSchema from './contact.schema.js';

// -- Address Schema --
const addressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  postcode: { type: String, required: true },
});

// -- Financial Cost Schema --
const financialCostSchema = new mongoose.Schema({
  net: { type: Number, required: true, min: 0 },
  vat: { type: Number, required: true, min: 0 },
  gross: { type: Number, required: true, min: 0 },
});

// -- Storage And Recovery Schema --
const storageAndRecoverySchema = new mongoose.Schema({
  net: { type: Number, required: true, min: 0 },
  vat: { type: Number, required: true, min: 0 },
  gross: { type: Number, required: true, min: 0 },
  reference: { type: String },
});

// -- Vehicle Schema --
const vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  engineSize: { type: String },
  registrationDate: { type: Date },
  damage: { type: String, trim: true },
  preExistingDamage: { type: String, trim: true },
  mobile: {
    type: String,
    enum: ['Yes', 'No'],
  },
});

// -- Driver Schema --
const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String },
  address: { type: addressSchema, required: true },
  contact: { type: contactSchema },
});

// -- Repairer Schema --
const repairerSchema = new mongoose.Schema({
  name: { type: String },
  contact: { type: contactSchema },
});

// -- Authorized Breakdown Schema --
const authorizedBreakdownSchema = new mongoose.Schema({
  parts: { type: Number, min: 0 },
  labour: { type: Number, min: 0 },
  paintAndMaterials: { type: Number, min: 0 },
  specialist: { type: Number, min: 0 },
});

// -- Repair Process Schema --
const repairProcessSchema = new mongoose.Schema({
  bookingInDate: { type: Date },
  mobileEstimateDate: { type: Date },
  dateIn: { type: Date },
  estimateReceivedDate: { type: Date },
  authorisedDate: { type: Date },
  authorisedAmounts: { type: Number, min: 0 },
  authorisedBreakdown: { type: authorizedBreakdownSchema },
  supplementaryAuthorisedDate: { type: Date },
  supplementaryAuthorisedAmounts: { type: Number, min: 0 },
  supplementaryReason: { type: String },
  calculatedRepairDays: { type: Number, min: 0 },
  estimatedCompletionDate: { type: Date },
  revisedEstimatedCompletionDate: { type: Date },
  repairCompletionDate: { type: Date },
  dateOut: { type: Date },
  repairDelayNotes: { type: String, trim: true },
  imagesReceivedDate: { type: Date },
  underpinned: { type: String, enum: ['Yes', 'No'] },
});

// -- Invoice Schema --
const invoiceSchema = new mongoose.Schema({
  receivedDate: { type: Date },
  approvedDate: { type: Date },
  rejectedReasons: { type: String, trim: true },
  billingStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Invoiced', 'Disputed'],
  },
});

// -- Financial Schema --
const financialSchema = new mongoose.Schema({
  repairCost: { type: financialCostSchema },
  totalLossFee: { type: financialCostSchema },
  storageAndRecovery: { type: storageAndRecoverySchema },
  engineersFee: { type: financialCostSchema },
  deliveryAndCollection: { type: financialCostSchema },
  replacementVehicleTotal: { type: Number, min: 0 },
  excess: { type: Number, min: 0 },
  excessSchemeName: { type: String },
});

// -- Total Loss Schema --
const totalLossSchema = new mongoose.Schema({
  date: { type: Date },
  pav: { type: Number, min: 0 },
  callDate: { type: Date },
  chaseDates: { type: Date },
  valuationDisputeNotes: { type: String, trim: true },
  v5cReceivedDate: { type: Date },
  motReceivedDate: { type: Date },
  financeLetterReceivedDate: { type: Date },
});

// -- Salvage Schema --
const salvageSchema = new mongoose.Schema({
  amount: { type: Number, min: 0 },
  category: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'N', 'S', 'None'],
  },
  agentName: { type: String },
  contact: { type: contactSchema },
  instructedDate: { type: Date },
  collectedDate: { type: Date },
  valuePaid: { type: String, enum: ['Yes', 'No'] },
  valueReceived: { type: String, enum: ['Yes', 'No'] },
  lotNumber: { type: String },
  clearedDate: { type: Date },
  customerRetaining: { type: String, enum: ['Yes', 'No'] },
});

// -- Claim Status Schema --
const claimStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [
      'New',
      'In Progress',
      'Total Loss',
      'Completed',
      'Awaiting Parts',
      'Awaiting Authorization',
    ],
    required: true,
  },
  vehicleStatus: {
    type: String,
    enum: [
      'In Repair',
      'Total Loss',
      'Repaired',
      'Awaiting Assessment',
      'Awaiting Parts',
      'Ready for Collection',
    ],
  },
  imsVehicleStatus: {
    type: String,
    enum: ['Active', 'Archived', 'Pending'],
  },
  cdStatus: {
    type: String,
    enum: ['Approved', 'Pending', 'Review'],
  },
  subrogated: { type: String, enum: ['Yes', 'No'] },
  clsp: { type: String },
  schemeCompanyReference: { type: String },
});

// -- Metadata Schema --
const metadataSchema = new mongoose.Schema({
  createdBy: { type: String },
  updatedBy: { type: String },
  schemaVersion: { type: String, default: '1.0.0' },
});

// -- Vehicle Claim Schema --
const vehicleClaimSchema = new mongoose.Schema(
  {
    companyReference: { type: String, required: true, unique: true },
    policyNumber: { type: String, required: true },
    partnerRef: { type: String },
    incidentDate: { type: Date, required: true },
    accidentCircumstances: { type: String, trim: true },
    notificationDate: { type: Date },
    fault: {
      type: String,
      enum: ['At Fault', 'Not At Fault', 'Split Liability', 'Undetermined'],
    },
    vehicle: { type: vehicleSchema, required: true },
    driver: { type: driverSchema, required: true },
    thirdPartyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ThirdParty',
    },
    repairer: { type: repairerSchema },
    repairProcess: { type: repairProcessSchema },
    invoice: { type: invoiceSchema },
    financial: { type: financialSchema },
    totalLoss: { type: totalLossSchema },
    salvage: { type: salvageSchema },
    claimStatus: { type: claimStatusSchema, required: true },
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
vehicleClaimSchema.index({ policyNumber: 1 });
vehicleClaimSchema.index({ 'vehicle.registrationNumber': 1 });
vehicleClaimSchema.index({ incidentDate: 1 });
vehicleClaimSchema.index({ 'driver.lastName': 1, 'driver.firstName': 1 });
vehicleClaimSchema.index({ 'claimStatus.status': 1 });
vehicleClaimSchema.index({ 'repairProcess.estimatedCompletionDate': 1 });
vehicleClaimSchema.index({ thirdPartyId: 1 });
vehicleClaimSchema.index({ 'vehicle.make': 1, 'vehicle.model': 1 });
vehicleClaimSchema.index({ 'metadata.updatedAt': 1 });
vehicleClaimSchema.index({ incidentDate: 1, 'claimStatus.status': 1 });
vehicleClaimSchema.index({
  accidentCircumstances: 'text',
  'vehicle.damage': 'text',
  'repairProcess.repairDelayNotes': 'text',
  'totalLoss.valuationDisputeNotes': 'text',
});

const VehicleClaim = mongoose.model('VehicleClaim', vehicleClaimSchema);

export default () => VehicleClaim;
