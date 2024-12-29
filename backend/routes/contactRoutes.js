const express = require("express");
const router = express.Router();
const { saveContactForm } = require("../controllers/contactController");

router.post("/contact", saveContactForm);

module.exports = router;