const express = require('express');
const router = express.Router();
const userController = require('../../controllers/auth'); 
const schemas = require('../../schemas/user');
const { userValidationSchema } = require("../../schemas/user");
const { validateContact } = require('../../middlewares'); 
const { updateAvatar } = require('../../controllers/auth/avatars');
const upload = require('../../middlewares/upload');
const authenticate = require('../../middlewares/auth');

router.post('/register', validateContact(userValidationSchema), userController.register);
router.post('/login', validateContact(userValidationSchema), userController.login);
router.get('/logout', userController.logout);
router.get('/current', userController.getCurrent);
router.patch('/:userId/subscription', validateContact(schemas.updateSubscriptionSchema), userController.updateSubscriptionById);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);


module.exports = router;
