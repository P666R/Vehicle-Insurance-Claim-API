import { z } from 'zod';

// -- Contact DTO --
const contactSchema = z.object({
  telephone: z.string().optional(),
  mobileTelephone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: 'Mobile telephone must be a 10-digit number',
    }),
  email: z.string().email('Invalid email address').optional(),
  fax: z.string().optional(),
  homeTelephone: z.string().optional(),
  workTelephone: z.string().optional(),
});

// -- Third Party DTO --
const thirdPartySchema = z.object({
  insurer: z.string().min(1, 'Insurer is required'),
  reference: z.string().min(1, 'Reference is required'),
  client: z.string().optional(),
  registration: z.string().optional(),
  pavPayment: z.enum(['Received', 'Pending']).optional(),
  pavPaymentChaseNotes: z.string().optional(),
  packSubmittedDate: z.date().optional(),
  contact: contactSchema.optional(),
});

// -- Address DTO --
const addressSchema = z.object({
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  postcode: z.string().min(1, 'Postcode is required'),
});

// -- Financial Cost DTO --
const financialCostSchema = z.object({
  net: z.number().min(0),
  vat: z.number().min(0),
  gross: z.number().min(0),
});

// -- Storage And Recovery DTO --
const storageAndRecoverySchema = financialCostSchema.extend({
  reference: z.string().optional(),
});

// -- Vehicle DTO --
const vehicleSchema = z.object({
  registrationNumber: z.string().min(1, 'Registration number is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  engineSize: z.string().optional(),
  registrationDate: z.date().optional(),
  damage: z.string().optional(),
  preExistingDamage: z.string().optional(),
  mobile: z.enum(['Yes', 'No']).optional(),
});

// -- Driver DTO --
const driverSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().optional(),
  address: addressSchema,
  contact: contactSchema.optional(),
});

// -- Repairer DTO --
const repairerSchema = z.object({
  name: z.string().optional(),
  contact: contactSchema.optional(),
});

// -- Authorized Breakdown DTO --
const authorizedBreakdownSchema = z.object({
  parts: z.number().min(0).optional(),
  labour: z.number().min(0).optional(),
  paintAndMaterials: z.number().min(0).optional(),
  specialist: z.number().min(0).optional(),
});

// -- Repair Process DTO --
const repairProcessSchema = z.object({
  bookingInDate: z.date().optional(),
  mobileEstimateDate: z.date().optional(),
  dateIn: z.date().optional(),
  estimateReceivedDate: z.date().optional(),
  authorisedDate: z.date().optional(),
  authorisedAmounts: z.number().min(0).optional(),
  authorisedBreakdown: authorizedBreakdownSchema.optional(),
  supplementaryAuthorisedDate: z.date().optional(),
  supplementaryAuthorisedAmounts: z.number().min(0).optional(),
  supplementaryReason: z.string().optional(),
  calculatedRepairDays: z.number().min(0).optional(),
  estimatedCompletionDate: z.date().optional(),
  revisedEstimatedCompletionDate: z.date().optional(),
  repairCompletionDate: z.date().optional(),
  dateOut: z.date().optional(),
  repairDelayNotes: z.string().optional(),
  imagesReceivedDate: z.date().optional(),
  underpinned: z.enum(['Yes', 'No']).optional(),
});

// -- Invoice DTO --
const invoiceSchema = z.object({
  receivedDate: z.date().optional(),
  approvedDate: z.date().optional(),
  rejectedReasons: z.string().optional(),
  billingStatus: z.enum(['Paid', 'Pending', 'Invoiced', 'Disputed']).optional(),
});

// -- Financial DTO --
const financialSchema = z.object({
  repairCost: financialCostSchema.optional(),
  totalLossFee: financialCostSchema.optional(),
  storageAndRecovery: storageAndRecoverySchema.optional(),
  engineersFee: financialCostSchema.optional(),
  deliveryAndCollection: financialCostSchema.optional(),
  replacementVehicleTotal: z.number().min(0).optional(),
  excess: z.number().min(0).optional(),
  excessSchemeName: z.string().optional(),
});

// -- Total Loss DTO --
const totalLossSchema = z.object({
  date: z.date().optional(),
  pav: z.number().min(0).optional(),
  callDate: z.date().optional(),
  chaseDates: z.date().optional(),
  valuationDisputeNotes: z.string().optional(),
  v5cReceivedDate: z.date().optional(),
  motReceivedDate: z.date().optional(),
  financeLetterReceivedDate: z.date().optional(),
});

// -- Salvage DTO --
const salvageSchema = z.object({
  amount: z.number().min(0).optional(),
  category: z.enum(['A', 'B', 'C', 'D', 'N', 'S', 'None']).optional(),
  agentName: z.string().optional(),
  contact: contactSchema.optional(),
  instructedDate: z.date().optional(),
  collectedDate: z.date().optional(),
  valuePaid: z.enum(['Yes', 'No']).optional(),
  valueReceived: z.enum(['Yes', 'No']).optional(),
  lotNumber: z.string().optional(),
  clearedDate: z.date().optional(),
  customerRetaining: z.enum(['Yes', 'No']).optional(),
});

// -- Claim Status DTO --
const claimStatusSchema = z.object({
  status: z
    .enum([
      'New',
      'In Progress',
      'Total Loss',
      'Completed',
      'Awaiting Parts',
      'Awaiting Authorization',
    ])
    .optional(),
  vehicleStatus: z
    .enum([
      'In Repair',
      'Total Loss',
      'Repaired',
      'Awaiting Assessment',
      'Awaiting Parts',
      'Ready for Collection',
    ])
    .optional(),
  imsVehicleStatus: z.enum(['Active', 'Archived', 'Pending']).optional(),
  cdStatus: z.enum(['Approved', 'Pending', 'Review']).optional(),
  subrogated: z.enum(['Yes', 'No']).optional(),
  clsp: z.string().optional(),
  schemeCompanyReference: z.string().optional(),
});

// -- Metadata DTO --
const metadataSchema = z.object({
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  schemaVersion: z.string().default('1.0.0'),
});

// -- Vehicle Claim DTOs --
export const createVehicleClaimDto = z.object({
  companyReference: z.string().min(1, 'Company reference is required'),
  policyNumber: z.string().min(1, 'Policy number is required'),
  partnerRef: z.string().optional(),
  incidentDate: z.date(),
  accidentCircumstances: z.string().optional(),
  notificationDate: z.date().optional(),
  fault: z
    .enum(['At Fault', 'Not At Fault', 'Split Liability', 'Undetermined'])
    .optional(),
  vehicle: vehicleSchema,
  driver: driverSchema,
  thirdParty: thirdPartySchema.optional(), // Embedded thirdParty schema
  repairer: repairerSchema.optional(),
  repairProcess: repairProcessSchema.optional(),
  invoice: invoiceSchema.optional(),
  financial: financialSchema.optional(),
  totalLoss: totalLossSchema.optional(),
  salvage: salvageSchema.optional(),
  claimStatus: claimStatusSchema,
  metadata: metadataSchema,
});

export const updateVehicleClaimDto = createVehicleClaimDto.partial(); // Allow partial updates
