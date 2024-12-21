const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Add routes for resource CRUD operations here

// Resource Routes
router.post('/resources', resourceController.createResource);
router.get('/resources', resourceController.getAllResources);
router.get('/resources/:id', resourceController.getResourceById);
router.put('/resources/:id', resourceController.updateResource);
router.delete('/resources/:id', resourceController.deleteResource);

module.exports = router;
