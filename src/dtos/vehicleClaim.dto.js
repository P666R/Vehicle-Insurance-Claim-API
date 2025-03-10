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
  packSubmittedDate: z.coerce.date().optional().nullable(),
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
  registrationDate: z.coerce.date().optional().nullable(),
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
  bookingInDate: z.coerce.date().optional().nullable(),
  mobileEstimateDate: z.coerce.date().optional().nullable(),
  dateIn: z.coerce.date().optional().nullable(),
  estimateReceivedDate: z.coerce.date().optional().nullable(),
  authorisedDate: z.coerce.date().optional().nullable(),
  authorisedAmounts: z.number().min(0).optional(),
  authorisedBreakdown: authorizedBreakdownSchema.optional(),
  supplementaryAuthorisedDate: z.coerce.date().optional().nullable(),
  supplementaryAuthorisedAmounts: z.number().min(0).optional(),
  supplementaryReason: z.string().optional(),
  calculatedRepairDays: z.number().min(0).optional(),
  estimatedCompletionDate: z.coerce.date().optional().nullable(),
  revisedEstimatedCompletionDate: z.coerce.date().optional().nullable(),
  repairCompletionDate: z.coerce.date().optional().nullable(),
  dateOut: z.coerce.date().optional().nullable(),
  repairDelayNotes: z.string().optional(),
  imagesReceivedDate: z.coerce.date().optional().nullable(),
  underpinned: z.enum(['Yes', 'No']).optional(),
});

// -- Invoice DTO --
const invoiceSchema = z.object({
  receivedDate: z.coerce.date().optional().nullable(),
  approvedDate: z.coerce.date().optional().nullable(),
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
  date: z.coerce.date().optional().nullable(),
  pav: z.number().min(0).optional(),
  callDate: z.coerce.date().optional().nullable(),
  chaseDates: z.coerce.date().optional().nullable(),
  valuationDisputeNotes: z.string().optional(),
  v5cReceivedDate: z.coerce.date().optional().nullable(),
  motReceivedDate: z.coerce.date().optional().nullable(),
  financeLetterReceivedDate: z.coerce.date().optional().nullable(),
});

// -- Salvage DTO --
const salvageSchema = z.object({
  amount: z.number().min(0).optional(),
  category: z.enum(['A', 'B', 'C', 'D', 'N', 'S', 'None']).optional(),
  agentName: z.string().optional(),
  contact: contactSchema.optional(),
  instructedDate: z.coerce.date().optional().nullable(),
  collectedDate: z.coerce.date().optional().nullable(),
  valuePaid: z.enum(['Yes', 'No']).optional(),
  valueReceived: z.enum(['Yes', 'No']).optional(),
  lotNumber: z.string().optional(),
  clearedDate: z.coerce.date().optional().nullable(),
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

// -- Vehicle Claim DTOs --
export const createVehicleClaimDto = z.object({
  companyReference: z.string().min(1, 'Company reference is required'),
  policyNumber: z.string().min(1, 'Policy number is required'),
  partnerRef: z.string().optional(),
  incidentDate: z.coerce.date(),
  accidentCircumstances: z.string().optional(),
  notificationDate: z.coerce.date().optional().nullable(),
  fault: z
    .enum(['At Fault', 'Not At Fault', 'Split Liability', 'Undetermined'])
    .optional(),
  vehicle: vehicleSchema,
  driver: driverSchema,
  thirdParty: thirdPartySchema.optional(),
  repairer: repairerSchema.optional(),
  repairProcess: repairProcessSchema.optional(),
  invoice: invoiceSchema.optional(),
  financial: financialSchema.optional(),
  totalLoss: totalLossSchema.optional(),
  salvage: salvageSchema.optional(),
  claimStatus: claimStatusSchema,
});

export const updateVehicleClaimDto = createVehicleClaimDto.partial();

// Validation functions
export const validateCreateVehicleClaim = (data) =>
  createVehicleClaimDto.parse(data);
export const validateUpdateVehicleClaim = (data) =>
  updateVehicleClaimDto.parse(data);
