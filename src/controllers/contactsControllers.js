const { controllerWrapper, HttpError } = require("../helpers");
const { contactSchema } = require("../schemas/contactSchemas");

const getAll = async (req, res, next) => {
  const data = await contactSchema.find();
  res.json(data);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactSchema.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");;
  }
  res.json(contactSchema);
}; 

const addContactController = async (req, res, next) => {
  const result = await contactSchema.create(req.body);
  res.status(201).json(result);
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactSchema.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContactController = async (req, res, next) => {
   const { contactId } = req.params;
  const result = await contactSchema.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContactController = async (req, res, next) => {
    const { contactId } = req.params;
  const result = await contactSchema.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getContactByIdController: controllerWrapper(getContactByIdController),
  addContactController: controllerWrapper(addContactController),
  removeContactController: controllerWrapper(removeContactController),
  updateContactController: controllerWrapper(updateContactController),
  updateStatusContactController: controllerWrapper(updateStatusContactController),
};