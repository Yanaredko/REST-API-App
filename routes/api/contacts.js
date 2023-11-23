const express = require('express');
const router = express.Router();
const contactsModel = require("../../models/contacts");
const Joi = require("joi");

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
  
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    });

    const validationResult = schema.validate({ name, email, phone });

    if (validationResult.error) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newContact = await contactsModel.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    await contactsModel.removeContact(contactId);
    res.json({ message: "Contact deleted " });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
    }).min(1);

    const validationResult = schema.validate({ name, email, phone });

    if (validationResult.error) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    const updatedContact = await contactsModel.updateContact(contactId, { name, email, phone });

    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
