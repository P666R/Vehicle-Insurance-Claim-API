import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { envConfig } from './env.config.js';

// -- Swagger definition --
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Vehicle Insurance Claim API',
    version: '1.0.0',
    description: 'API for managing vehicle insurance claims.',
  },
  servers: [
    {
      url: `http://localhost:${envConfig.PORT || 3000}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      VehicleClaim: {
        type: 'object',
        required: [
          'companyReference',
          'policyNumber',
          'incidentDate',
          'vehicle',
          'driver',
          'claimStatus',
        ],
        properties: {
          companyReference: {
            type: 'string',
            description: 'Unique reference for the claim.',
            example: 'CLAIM-2025-001',
          },
          policyNumber: {
            type: 'string',
            description: 'Policy number associated with the claim.',
            example: 'POL-987654',
          },
          partnerRef: {
            type: 'string',
            description: 'Partner reference, if applicable.',
            example: 'PARTNER-XYZ',
          },
          incidentDate: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time of the incident.',
            example: '2025-01-15T10:00:00Z',
          },
          accidentCircumstances: {
            type: 'string',
            description: 'Description of the accident circumstances.',
            example:
              'Rear-end collision at traffic light due to sudden braking.',
          },
          notificationDate: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time of claim notification.',
            example: '2025-01-16T09:00:00Z',
            nullable: true,
          },
          fault: {
            type: 'string',
            enum: [
              'At Fault',
              'Not At Fault',
              'Split Liability',
              'Undetermined',
            ],
            description: 'Fault determination for the claim.',
            example: 'Not At Fault',
          },
          vehicle: {
            $ref: '#/components/schemas/Vehicle',
          },
          driver: {
            $ref: '#/components/schemas/Driver',
          },
          thirdParty: {
            $ref: '#/components/schemas/ThirdParty',
          },
          repairer: {
            $ref: '#/components/schemas/Repairer',
          },
          repairProcess: {
            $ref: '#/components/schemas/RepairProcess',
          },
          invoice: {
            $ref: '#/components/schemas/Invoice',
          },
          financial: {
            $ref: '#/components/schemas/Financial',
          },
          totalLoss: {
            $ref: '#/components/schemas/TotalLoss',
          },
          salvage: {
            $ref: '#/components/schemas/Salvage',
          },
          claimStatus: {
            $ref: '#/components/schemas/ClaimStatus',
          },
        },
      },
      Vehicle: {
        type: 'object',
        required: ['registrationNumber', 'make', 'model'],
        properties: {
          registrationNumber: {
            type: 'string',
            description: 'Vehicle registration number.',
            example: 'ABC123XYZ',
          },
          make: {
            type: 'string',
            description: 'Vehicle make.',
            example: 'Toyota',
          },
          model: {
            type: 'string',
            description: 'Vehicle model.',
            example: 'Camry',
          },
          engineSize: {
            type: 'string',
            description: 'Engine size of the vehicle.',
            example: '2.5L',
          },
          registrationDate: {
            type: 'string',
            format: 'date',
            description: 'Date of vehicle registration.',
            example: '2020-06-01',
            nullable: true,
          },
          damage: {
            type: 'string',
            description: 'Description of damage to the vehicle.',
            example: 'Rear bumper and trunk damaged',
          },
          preExistingDamage: {
            type: 'string',
            description: 'Description of pre-existing damage.',
            example: 'Minor scratch on driver-side door',
          },
          mobile: {
            type: 'string',
            enum: ['Yes', 'No'],
            description: 'Whether the vehicle is mobile.',
            example: 'No',
          },
        },
      },
      Driver: {
        type: 'object',
        required: ['firstName', 'lastName', 'address'],
        properties: {
          firstName: {
            type: 'string',
            description: 'Driver’s first name.',
            example: 'John',
          },
          lastName: {
            type: 'string',
            description: 'Driver’s last name.',
            example: 'Doe',
          },
          title: {
            type: 'string',
            description: 'Driver’s title.',
            example: 'Mr.',
          },
          address: {
            $ref: '#/components/schemas/Address',
          },
          contact: {
            $ref: '#/components/schemas/Contact',
          },
        },
      },
      Address: {
        type: 'object',
        required: ['addressLine1', 'postcode'],
        properties: {
          addressLine1: {
            type: 'string',
            description: 'First line of the address.',
            example: '123 Main St',
          },
          postcode: {
            type: 'string',
            description: 'Postal code.',
            example: '12345',
          },
        },
      },
      Contact: {
        type: 'object',
        properties: {
          telephone: {
            type: 'string',
            description: 'Telephone number.',
            example: '123-456-7890',
          },
          mobileTelephone: {
            type: 'string',
            description: 'Mobile telephone number (10 digits).',
            example: '9876543210',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address.',
            example: 'john.doe@example.com',
          },
          fax: {
            type: 'string',
            description: 'Fax number.',
            example: '123-456-7891',
          },
          homeTelephone: {
            type: 'string',
            description: 'Home telephone number.',
            example: '123-456-7892',
          },
          workTelephone: {
            type: 'string',
            description: 'Work telephone number.',
            example: '123-456-7893',
          },
        },
      },
      ThirdParty: {
        type: 'object',
        required: ['insurer', 'reference'],
        properties: {
          insurer: {
            type: 'string',
            description: 'Third-party insurer name.',
            example: 'SafeInsure Ltd.',
          },
          reference: {
            type: 'string',
            description: 'Third-party reference.',
            example: 'TP-REF-2025-001',
          },
          client: {
            type: 'string',
            description: 'Third-party client name.',
            example: 'Jane Smith',
          },
          registration: {
            type: 'string',
            description: 'Third-party vehicle registration.',
            example: 'XYZ789ABC',
          },
          pavPayment: {
            type: 'string',
            enum: ['Received', 'Pending'],
            description: 'PAV payment status.',
            example: 'Pending',
          },
          pavPaymentChaseNotes: {
            type: 'string',
            description: 'Notes on chasing PAV payment.',
            example: 'Chased insurer on 2025-01-20',
          },
          packSubmittedDate: {
            type: 'string',
            format: 'date',
            description: 'Date the pack was submitted.',
            example: '2025-01-18',
            nullable: true,
          },
          contact: {
            $ref: '#/components/schemas/Contact',
          },
        },
      },
      Repairer: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the repairer.',
            example: 'AutoFix Garage',
          },
          contact: {
            $ref: '#/components/schemas/Contact',
          },
        },
      },
      RepairProcess: {
        type: 'object',
        properties: {
          bookingInDate: {
            type: 'string',
            format: 'date',
            description: 'Date the vehicle was booked in for repair.',
            example: '2025-01-20',
            nullable: true,
          },
          mobileEstimateDate: {
            type: 'string',
            format: 'date',
            description: 'Date of mobile estimate.',
            example: '2025-01-21',
            nullable: true,
          },
          dateIn: {
            type: 'string',
            format: 'date',
            description: 'Date the vehicle entered the repair shop.',
            example: '2025-01-22',
            nullable: true,
          },
          estimateReceivedDate: {
            type: 'string',
            format: 'date',
            description: 'Date the estimate was received.',
            example: '2025-01-23',
            nullable: true,
          },
          authorisedDate: {
            type: 'string',
            format: 'date',
            description: 'Date the repair was authorized.',
            example: '2025-01-24',
            nullable: true,
          },
          authorisedAmounts: {
            type: 'number',
            description: 'Authorized repair amounts.',
            example: 1500,
          },
          authorisedBreakdown: {
            $ref: '#/components/schemas/AuthorizedBreakdown',
          },
          supplementaryAuthorisedDate: {
            type: 'string',
            format: 'date',
            description: 'Date of supplementary authorization.',
            example: '2025-01-25',
            nullable: true,
          },
          supplementaryAuthorisedAmounts: {
            type: 'number',
            description: 'Supplementary authorized amounts.',
            example: 300,
          },
          supplementaryReason: {
            type: 'string',
            description: 'Reason for supplementary authorization.',
            example: 'Additional damage found on undercarriage',
          },
          calculatedRepairDays: {
            type: 'number',
            description: 'Calculated days for repair.',
            example: 5,
          },
          estimatedCompletionDate: {
            type: 'string',
            format: 'date',
            description: 'Estimated completion date for repairs.',
            example: '2025-01-30',
            nullable: true,
          },
          revisedEstimatedCompletionDate: {
            type: 'string',
            format: 'date',
            description: 'Revised estimated completion date.',
            example: '2025-02-01',
            nullable: true,
          },
          repairCompletionDate: {
            type: 'string',
            format: 'date',
            description: 'Actual repair completion date.',
            example: '2025-02-01',
            nullable: true,
          },
          dateOut: {
            type: 'string',
            format: 'date',
            description: 'Date the vehicle left the repair shop.',
            example: '2025-02-02',
            nullable: true,
          },
          repairDelayNotes: {
            type: 'string',
            description: 'Notes on repair delays.',
            example: 'Delayed due to parts shortage',
          },
          imagesReceivedDate: {
            type: 'string',
            format: 'date',
            description: 'Date images were received.',
            example: '2025-01-22',
            nullable: true,
          },
          underpinned: {
            type: 'string',
            enum: ['Yes', 'No'],
            description: 'Whether the vehicle was underpinned.',
            example: 'Yes',
          },
        },
      },
      AuthorizedBreakdown: {
        type: 'object',
        properties: {
          parts: {
            type: 'number',
            description: 'Cost of parts.',
            example: 800,
          },
          labour: {
            type: 'number',
            description: 'Cost of labour.',
            example: 500,
          },
          paintAndMaterials: {
            type: 'number',
            description: 'Cost of paint and materials.',
            example: 150,
          },
          specialist: {
            type: 'number',
            description: 'Cost of specialist services.',
            example: 50,
          },
        },
      },
      Invoice: {
        type: 'object',
        properties: {
          receivedDate: {
            type: 'string',
            format: 'date',
            description: 'Date the invoice was received.',
            example: '2025-02-03',
            nullable: true,
          },
          approvedDate: {
            type: 'string',
            format: 'date',
            description: 'Date the invoice was approved.',
            example: '2025-02-04',
            nullable: true,
          },
          rejectedReasons: {
            type: 'string',
            description: 'Reasons for invoice rejection.',
            example: '',
          },
          billingStatus: {
            type: 'string',
            enum: ['Paid', 'Pending', 'Invoiced', 'Disputed'],
            description: 'Billing status of the invoice.',
            example: 'Paid',
          },
        },
      },
      Financial: {
        type: 'object',
        properties: {
          repairCost: {
            $ref: '#/components/schemas/FinancialCost',
          },
          totalLossFee: {
            $ref: '#/components/schemas/FinancialCost',
          },
          storageAndRecovery: {
            $ref: '#/components/schemas/StorageAndRecovery',
          },
          engineersFee: {
            $ref: '#/components/schemas/FinancialCost',
          },
          deliveryAndCollection: {
            $ref: '#/components/schemas/FinancialCost',
          },
          replacementVehicleTotal: {
            type: 'number',
            description: 'Total cost for replacement vehicle.',
            example: 200,
          },
          excess: {
            type: 'number',
            description: 'Excess amount.',
            example: 100,
          },
          excessSchemeName: {
            type: 'string',
            description: 'Name of the excess scheme.',
            example: 'Standard Excess Scheme',
          },
        },
      },
      FinancialCost: {
        type: 'object',
        required: ['net', 'vat', 'gross'],
        properties: {
          net: {
            type: 'number',
            description: 'Net cost.',
            example: 1200,
          },
          vat: {
            type: 'number',
            description: 'VAT amount.',
            example: 240,
          },
          gross: {
            type: 'number',
            description: 'Gross cost.',
            example: 1440,
          },
        },
      },
      StorageAndRecovery: {
        type: 'object',
        required: ['net', 'vat', 'gross'],
        properties: {
          net: {
            type: 'number',
            description: 'Net cost.',
            example: 100,
          },
          vat: {
            type: 'number',
            description: 'VAT amount.',
            example: 20,
          },
          gross: {
            type: 'number',
            description: 'Gross cost.',
            example: 120,
          },
          reference: {
            type: 'string',
            description: 'Storage and recovery reference.',
            example: 'STOR-REF-001',
          },
        },
      },
      TotalLoss: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date',
            description: 'Date of total loss declaration.',
            example: null,
            nullable: true,
          },
          pav: {
            type: 'number',
            description: 'PAV amount.',
            example: 0,
          },
          callDate: {
            type: 'string',
            format: 'date',
            description: 'Date of total loss call.',
            example: null,
            nullable: true,
          },
          chaseDates: {
            type: 'string',
            format: 'date',
            description: 'Dates of chasing total loss.',
            example: null,
            nullable: true,
          },
          valuationDisputeNotes: {
            type: 'string',
            description: 'Notes on valuation disputes.',
            example: '',
          },
          v5cReceivedDate: {
            type: 'string',
            format: 'date',
            description: 'Date V5C document received.',
            example: null,
            nullable: true,
          },
          motReceivedDate: {
            type: 'string',
            format: 'date',
            description: 'Date MOT document received.',
            example: null,
            nullable: true,
          },
          financeLetterReceivedDate: {
            type: 'string',
            format: 'date',
            description: 'Date finance letter received.',
            example: null,
            nullable: true,
          },
        },
      },
      Salvage: {
        type: 'object',
        properties: {
          amount: {
            type: 'number',
            description: 'Salvage amount.',
            example: 0,
          },
          category: {
            type: 'string',
            enum: ['A', 'B', 'C', 'D', 'N', 'S', 'None'],
            description: 'Salvage category.',
            example: 'None',
          },
          agentName: {
            type: 'string',
            description: 'Name of the salvage agent.',
            example: '',
          },
          contact: {
            $ref: '#/components/schemas/Contact',
          },
          instructedDate: {
            type: 'string',
            format: 'date',
            description: 'Date salvage was instructed.',
            example: null,
            nullable: true,
          },
          collectedDate: {
            type: 'string',
            format: 'date',
            description: 'Date salvage was collected.',
            example: null,
            nullable: true,
          },
          valuePaid: {
            type: 'string',
            enum: ['Yes', 'No'],
            description: 'Whether salvage value was paid.',
            example: 'No',
          },
          valueReceived: {
            type: 'string',
            enum: ['Yes', 'No'],
            description: 'Whether salvage value was received.',
            example: 'No',
          },
          lotNumber: {
            type: 'string',
            description: 'Salvage lot number.',
            example: '',
          },
          clearedDate: {
            type: 'string',
            format: 'date',
            description: 'Date salvage was cleared.',
            example: null,
            nullable: true,
          },
          customerRetaining: {
            type: 'string',
            enum: ['Yes', 'No'],
            description: 'Whether the customer is retaining the vehicle.',
            example: 'No',
          },
        },
      },
      ClaimStatus: {
        type: 'object',
        required: ['status'],
        properties: {
          status: {
            type: 'string',
            enum: [
              'New',
              'In Progress',
              'Total Loss',
              'Completed',
              'Awaiting Parts',
              'Awaiting Authorization',
            ],
            description: 'Current status of the claim.',
            example: 'Completed',
          },
          vehicleStatus: {
            type: 'string',
            enum: [
              'In Repair',
              'Total Loss',
              'Repaired',
              'Awaiting Assessment',
              'Awaiting Parts',
              'Ready for Collection',
            ],
            description: 'Status of the vehicle.',
            example: 'Repaired',
          },
          imsVehicleStatus: {
            type: 'string',
            enum: ['Active', 'Archived', 'Pending'],
            description: 'IMS vehicle status.',
            example: 'Active',
          },
          cdStatus: {
            type: 'string',
            enum: ['Approved', 'Pending', 'Review'],
            description: 'CD status.',
            example: 'Approved',
          },
          subrogated: {
            type: 'string',
            enum: ['Yes', 'No'],
            description: 'Whether the claim is subrogated.',
            example: 'No',
          },
          clsp: {
            type: 'string',
            description: 'CLSP identifier.',
            example: 'CLSP-001',
          },
          schemeCompanyReference: {
            type: 'string',
            description: 'Scheme company reference.',
            example: 'SCH-REF-001',
          },
        },
      },
    },
  },
};

// -- Options for swagger-jsdoc --
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

// -- Initialize swagger-jsdoc --
const swaggerSpec = swaggerJSDoc(options);

// -- Export the Swagger UI middleware setup --
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export { swaggerSpec, setupSwagger };
