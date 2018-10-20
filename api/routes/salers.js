const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authorization');
const upload = require('../middleware/upload');

const SalersControllers = require('../controllers/salers');


// POST request to Signup
router.post('/signup', SalersControllers.signup);

// POST request to Login
router.post('/login', SalersControllers.login);

// PATCH request to edit account
router.patch('/:salerId', upload.single('image'), SalersControllers.edit)

// PATCH request to cancel account (sets variable validAccount = false)
router.patch('/cancelaccount/:salerId', checkAuth, SalersControllers.cancelAccount)

module.exports = router;