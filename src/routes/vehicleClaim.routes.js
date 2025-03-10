import express from 'express';
import VehicleClaimController from '../controllers/vehicleClaim.controller.js';
import VehicleClaimService from '../services/vehicleClaim.service.js';
import VehicleClaimRepository from '../repositories/vehicleClaim.repository.js';
import VehicleClaim from '../models/vehicleClaim.model.js';

const router = express.Router();

const createVehicleClaimInstances = (model = VehicleClaim) => {
  const repository = new VehicleClaimRepository(model);
  const service = new VehicleClaimService(repository);
  const controller = new VehicleClaimController(service);
  return controller;
};

const controller = createVehicleClaimInstances();

/**
 * @swagger
 * /vehicle-claims:
 *   get:
 *     summary: Retrieve all vehicle claims
 *     tags: [Vehicle Claims]
 *     responses:
 *       200:
 *         description: List of vehicle claims
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VehicleClaim'
 *       500:
 *         description: Internal server error
 */
router.route('/').get(controller.findAll.bind(controller));

/**
 * @swagger
 * /vehicle-claims:
 *   post:
 *     summary: Create a new vehicle claim
 *     tags: [Vehicle Claims]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleClaim'
 *     responses:
 *       201:
 *         description: Vehicle claim created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehicleClaim'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.route('/').post(controller.create.bind(controller));

/**
 * @swagger
 * /vehicle-claims/{id}:
 *   get:
 *     summary: Retrieve a vehicle claim by ID
 *     tags: [Vehicle Claims]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle claim ID
 *     responses:
 *       200:
 *         description: Vehicle claim details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehicleClaim'
 *       404:
 *         description: Vehicle claim not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id').get(controller.findById.bind(controller));

/**
 * @swagger
 * /vehicle-claims/{id}:
 *   put:
 *     summary: Update a vehicle claim by ID
 *     tags: [Vehicle Claims]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle claim ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleClaim'
 *     responses:
 *       200:
 *         description: Vehicle claim updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehicleClaim'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Vehicle claim not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id').put(controller.update.bind(controller));

/**
 * @swagger
 * /vehicle-claims/{id}:
 *   delete:
 *     summary: Delete a vehicle claim by ID
 *     tags: [Vehicle Claims]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vehicle claim ID
 *     responses:
 *       200:
 *         description: Vehicle claim deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Vehicle claim deleted'
 *       404:
 *         description: Vehicle claim not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id').delete(controller.delete.bind(controller));

export default router;
