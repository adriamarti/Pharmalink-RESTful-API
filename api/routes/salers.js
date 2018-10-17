const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authorization')

const SalersControllers = require('../controllers/salers')

// POST request to Signup
router.post('/signup', SalersControllers.signup);

// POST request to Login
router.post('/login', SalersControllers.login);

// PATCH request to cancel account (sets variable validAccount = false)
router.patch('/cancelaccount/:salerId', checkAuth, SalersControllers.cancelAccount)

module.exports = router;