const express = require('express');
const router = express.Router();
const validateContact = require('../../middlewares/validateContact');
const { controllerWrapper } = require('../helpers');
const {
  getAll,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require('../controllers/contactControllers');


router.get('/', controllerWrapper(getAll));
router.get('/:contactId', controllerWrapper(getContactByIdController));
router.post('/', validateContact, controllerWrapper(addContactController));
router.delete('/:contactId', controllerWrapper(removeContactController));
router.put('/:contactId', validateContact, controllerWrapper(updateContactController));
router.patch('/:contactId/favorite', controllerWrapper(updateStatusContactController));


module.exports = router;
