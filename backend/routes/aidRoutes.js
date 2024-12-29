const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const FinancialAid = require('../models/FinancialAid');


// post route for ngo to create a financial aid program
router.post('/', authMiddleware, async (req, res) => {
    console.log(' aid program post route entered');
    const { title, description, eligibilityCriteria, amount } = req.body;
    console.log("request body: ", req.body);
    console.log(title, description, eligibilityCriteria, amount);

    try {
        const newProgram = new FinancialAid({
            title,
            description,
            eligibilityCriteria,
            amount,
            contactEmail: req.user.email,
            createdBy: req.user._id,
        });

        console.log('new program to be entered into db: ', newProgram);
        await newProgram.save();
        console.log('new program entered into db');
        res.status(201).json(newProgram);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get all financial aid programs
router.get('/', async (req, res) => {
    console.log('Entered aid get route backend');
    try {
        const programs = await FinancialAid.find()
            .populate('createdBy', 'name email')
            .exec();  // Execute the query and return a promise

        console.log("Populated programssss:");
        console.log(programs);

        if (programs.length === 0) {
            console.log("No programs found or no NGOs associated.");
        } else {
            console.log("Found programs with populated data.");
        }

        res.json(programs);
    } catch (err) {
        console.error("Error fetching financial aids:", err);
        res.status(500).send('Server error');
    }
});


// Update a financial aid program by ID
router.put('/:id', authMiddleware, async (req, res) => {
    console.log("inside put backend route aid");
    console.log(req.body);
    const { id } = req.params;
    const { title, description, eligibilityCriteria, amount } = req.body;
    console.log(id, title, description, eligibilityCriteria, amount);
    try {
        const program = await FinancialAid.findOneAndUpdate(
            { _id: id, createdBy: req.user._id },
            { title, description, eligibilityCriteria, amount },
            { new: true, runValidators: true }
        );

        if (!program) {
            return res.status(404).json({ message: 'Program not found or unauthorized' });
        }
        console.log("found and updated", program);
        res.json(program);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete a financial aid program by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    console.log("inside delete route midwr backend");
    const { id } = req.params;
    console.log(id);
    try {
        const program = await FinancialAid.findOneAndDelete({
            _id: id,
            createdBy: req.user._id
        });

        if (!program) {
            return res.status(404).json({ message: 'Program not found or unauthorized' });
        }

        res.json({ message: 'Program deleted successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get all financial aid programs created by the authenticated NGO
router.get('/my', authMiddleware, async (req, res) => {
    console.log("Received request to /aid/my", req.user);
    try {
        const aidPrograms = await FinancialAid.find({ createdBy: req.user._id });
        if (!aidPrograms) {
            return res.status(404).json({ message: 'No aid programs found for this user.' });
        }
        res.json(aidPrograms);
    } catch (err) {
        console.error("Error in fetching aid programs:", err);
        res.status(500).send('Server error');
    }
});


module.exports = router;