const express = require('express');
const router = express.Router();
const contactsModel = require("../../models/contacts");
const validateContact = require("../../middlewares/validateContact");
const controllerWrapper = require("../../controllers/controllerWrapper");

const listContactsController = async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.getContactById(contactId);

    if (!contact) {
      const notFoundError = new Error('Not found');
      notFoundError.status = 404;
      throw notFoundError;
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContactController = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contactsModel.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.getContactById(contactId);

    if (!contact) {
      const notFoundError = new Error('Not found');
      notFoundError.status = 404;
      throw notFoundError;
    }

    await contactsModel.removeContact(contactId);
    res.json({ message: "Contact deleted " });
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const updatedContact = await contactsModel.updateContact(contactId, { name, email, phone });

    if (!updatedContact) {
      const notFoundError = new Error('Not found');
      notFoundError.status = 404;
      throw notFoundError;
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (typeof favorite === 'undefined') {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const updatedContact = await contactsModel.updateStatusContact(contactId, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

router.get('/', controllerWrapper(listContactsController));
router.get('/:contactId', controllerWrapper(getContactByIdController));
router.post('/', validateContact, controllerWrapper(addContactController));
router.delete('/:contactId', controllerWrapper(removeContactController));
router.put('/:contactId', validateContact, controllerWrapper(updateContactController));
router.patch('/:contactId/favorite', controllerWrapper(updateStatusContactController));


module.exports = router;
