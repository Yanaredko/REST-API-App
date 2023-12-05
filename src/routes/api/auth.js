const express = require('express');
const router = express.Router();
const userController = require('../../controllers/auth'); 
const schemas = require('../../models/user');
const { userValidationSchema } = schemas;
const { validateContact } = require('../../middlewares'); 

router.post('/register', validateContact(userValidationSchema), userController.register);
router.post('/login', validateContact(userValidationSchema), userController.login);
router.get('/logout', userController.logout);
router.get('/current', userController.getCurrent);
router.patch('/:userId/subscription', validateContact(schemas.updateSubscriptionSchema), userController.updateSubscriptionById);

module.exports = router;
