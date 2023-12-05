const { controllerWrapper, HttpError } = require("../helpers");
const { contactSchema } = require("../schemas/contactSchemas");

const getAll = async (req, res, next) => {
  
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite === "true") {
    const result = await contactSchema.find({ owner, favorite }, "", {
      skip,
      limit,
    });
    return res.json(result);
  }

  const data = await contactSchema.find({ owner }, "", { skip, limit });
  return res.json(data);
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
  const { _id: owner } = req.user;
  const result = await contactSchema.create(req.body, owner);
  res.status(201).json(result);
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactSchema.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact has been deleted",
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