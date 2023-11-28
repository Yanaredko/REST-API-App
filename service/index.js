const mongoose = require('mongoose');
const Contact = require('../schemas/contactSchema');

const databaseConnectedEmitter = new (require('events').EventEmitter)();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    databaseConnectedEmitter.emit('connected');
    console.log("Database connection successful");
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

const onDatabaseConnected = (callback) => {
  databaseConnectedEmitter.on('connected', callback);
};

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return null;
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { favorite: body.favorite } },
    { new: true }
  );

  return updatedContact;
};

module.exports = {
  connectToDatabase,
  onDatabaseConnected,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};