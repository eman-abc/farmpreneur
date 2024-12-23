// dashboardRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const productController = require('../controllers/productController');  // Import productController

router.get('/', authMiddleware, (req, res) => {
    console.log('INSIDE DASHBOARD roUTE.JS BACKEND')
    console.log('Session Data:', req.session.user);  // Check if session is set correctly

    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = req.session.user;
    let responseData = { user };
    console.log(user);

    if (user.role === 'user') {
        responseData.products = [{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }];
    } else if (user.role === 'mentor') {
        responseData.mentorships = [{ id: 1, topic: 'Mentorship A' }];
    } else if (user.role === 'ngo') {
        responseData.resources = [{ id: 1, name: 'Resource A' }];
    }

    res.json(responseData);
});

// Entrepreneur Products Route
router.get('/entrepreneur/products', productController.getEntrepreneurProducts);  // Ensure this route is defined


module.exports = router;
