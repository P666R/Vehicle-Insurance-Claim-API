import mongoose from 'mongoose';
import validator from 'validator';

// -- Contact Schema --
const contactSchema = new mongoose.Schema(
  {
    telephone: { type: String },
    mobileTelephone: {
      type: String,
      validate: {
        validator: (v) => !v || validator.isMobilePhone(v, 'any'),
        message: 'Invalid mobile telephone number',
      },
    },
    email: {
      type: String,
      validate: {
        validator: (v) => !v || validator.isEmail(v),
        message: 'Invalid email address',
      },
    },
    fax: { type: String },
    homeTelephone: { type: String },
    workTelephone: { type: String },
  },
  { _id: false },
);

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
  },
  { _id: false },
);

// -- Address Schema --
const addressSchema = new mongoose.Schema(
  {
    addressLine1: { type: String, required: true },
    postcode: { type: String, required: true },
  },
  { _id: false },
);

// -- Financial Cost Schema --
const financialCostSchema = new mongoose.Schema(
  {
    net: { type: Number, required: true, min: 0 },
    vat: { type: Number, required: true, min: 0 },
    gross: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

// -- Storage And Recovery Schema --
const storageAndRecoverySchema = new mongoose.Schema(
  {
    net: { type: Number, required: true, min: 0 },
    vat: { type: Number, required: true, min: 0 },
    gross: { type: Number, required: true, min: 0 },
    reference: { type: String },
  },
  { _id: false },
);

// -- Vehicle Schema --
const vehicleSchema = new mongoose.Schema(
  {
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
  },
  { _id: false },
);

// -- Driver Schema --
const driverSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String },
    address: { type: addressSchema, required: true },
    contact: { type: contactSchema },
  },
  { _id: false },
);

// -- Repairer Schema --
const repairerSchema = new mongoose.Schema(
  {
    name: { type: String },
    contact: { type: contactSchema },
  },
  { _id: false },
);

// -- Authorized Breakdown Schema --
const authorizedBreakdownSchema = new mongoose.Schema(
  {
    parts: { type: Number, min: 0 },
    labour: { type: Number, min: 0 },
    paintAndMaterials: { type: Number, min: 0 },
    specialist: { type: Number, min: 0 },
  },
  { _id: false },
);

// -- Repair Process Schema --
const repairProcessSchema = new mongoose.Schema(
  {
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
  },
  { _id: false },
);

// -- Invoice Schema --
const invoiceSchema = new mongoose.Schema(
  {
    receivedDate: { type: Date },
    approvedDate: { type: Date },
    rejectedReasons: { type: String, trim: true },
    billingStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Invoiced', 'Disputed'],
    },
  },
  { _id: false },
);

// -- Financial Schema --
const financialSchema = new mongoose.Schema(
  {
    repairCost: { type: financialCostSchema },
    totalLossFee: { type: financialCostSchema },
    storageAndRecovery: { type: storageAndRecoverySchema },
    engineersFee: { type: financialCostSchema },
    deliveryAndCollection: { type: financialCostSchema },
    replacementVehicleTotal: { type: Number, min: 0 },
    excess: { type: Number, min: 0 },
    excessSchemeName: { type: String },
  },
  { _id: false },
);

// -- Total Loss Schema --
const totalLossSchema = new mongoose.Schema(
  {
    date: { type: Date },
    pav: { type: Number, min: 0 },
    callDate: { type: Date },
    chaseDates: { type: Date },
    valuationDisputeNotes: { type: String, trim: true },
    v5cReceivedDate: { type: Date },
    motReceivedDate: { type: Date },
    financeLetterReceivedDate: { type: Date },
  },
  { _id: false },
);

// -- Salvage Schema --
const salvageSchema = new mongoose.Schema(
  {
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
  },
  { _id: false },
);

// -- Claim Status Schema --
const claimStatusSchema = new mongoose.Schema(
  {
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
  },
  { _id: false },
);

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
    thirdParty: { type: thirdPartySchema },
    repairer: { type: repairerSchema },
    repairProcess: { type: repairProcessSchema },
    invoice: { type: invoiceSchema },
    financial: { type: financialSchema },
    totalLoss: { type: totalLossSchema },
    salvage: { type: salvageSchema },
    claimStatus: { type: claimStatusSchema, required: true },
  },
  {
    timestamps: true,
  },
);

const VehicleClaim = mongoose.model('VehicleClaim', vehicleClaimSchema);

export default VehicleClaim;
