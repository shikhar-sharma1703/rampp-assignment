const express = require('express');
const userController = require('../controller/Customer/routes');

const router = express.Router();

router.put('/:userId', userController.updateUser);

module.exports = router;
