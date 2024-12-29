const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ExternalResource = require('../models/ExternalResource');

// create res for ngos
router.post('/', authMiddleware, async (req, res) => {
    console.log("inside res create middleware");
    const { title, url, category, description } = req.body;
    console.log(req.body);  // Log the request body for debugging

    if (!title || !url || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newResource = new ExternalResource({
            title,
            url,
            category,
            description,
            createdBy: req.user._id,  // Changed 'createdBy' to 'uploaderId'
        });


        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (err) {
        console.error('Error details:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

//get resource for entrepreneurs
router.get('/', async (req, res) => {
    console.log('inside get resources for entreprenuer');
    try {
        const resources = await ExternalResource.find().populate('createdBy', 'name email');
        console.log(resources);
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});


// update res for ngos
router.put('/:id', authMiddleware, async (req, res) => {

    const { title, description, url, category } = req.body;

    try {
        const updatedResource = await ExternalResource.findByIdAndUpdate(
            req.params.id,
            { title, description, url, category },
            { new: true } // Return the updated document
        );

        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json(updatedResource);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});


//delete res for ngos
router.delete('/:id', authMiddleware, async (req, res) => {
    console.log("inside delete resource middleware")
    try {
        const deletedResource = await ExternalResource.findByIdAndDelete(req.params.id);

        if (!deletedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json({ message: 'Resource deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// get ngo resources
router.get('/my', authMiddleware, async (req, res) => {
    try {
        // Filter resources by the current NGO's ID
        const resources = await ExternalResource.find({ createdBy: req.user._id });

        if (!resources || resources.length === 0) {
            return res.status(404).json({ message: 'No resources found for this NGO.' });
        }

        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});


module.exports = router;