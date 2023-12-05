const express = require('express');
const router = express.Router();
const validateContact = require('../../middlewares/validateContact');
const {
  getAll,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require('../controllers/contactControllers');


router.get('/', getAll);
router.get('/:contactId', getContactByIdController);
router.post('/', validateContact, addContactController);
router.delete('/:contactId', removeContactController);
router.put('/:contactId', validateContact, updateContactController);
router.patch('/:contactId/favorite', updateStatusContactController);


module.exports = router;
