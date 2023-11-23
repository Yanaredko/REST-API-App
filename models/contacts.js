const fs = require('fs/promises');
const Joi = require("joi");

const contactsPath = "./contacts.json";

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validationResult = schema.validate({ name, email, phone });

  if (validationResult.error) {
    throw new Error('Validation error: ' + validationResult.error.message);
  }

  const id = Date.now().toString();
  const contact = { id, name, email, phone };

  const contacts = await listContacts();
  contacts.push(contact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return { id, name, email, phone };
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }).min(1);

  const validationResult = schema.validate({ name, email, phone });

  if (validationResult.error) {
    throw new Error('Validation error: ' + validationResult.error.message);
  }

  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);

  if (index === -1) {
    throw new Error('Contact not found');
  }

  contacts[index] = { ...contacts[index], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

