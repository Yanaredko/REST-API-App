const Joi = require("joi");

const validateContact = (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }).min(1);

  const validationResult = schema.validate({ name, email, phone });

  if (validationResult.error) {
    res.status(400).json({ message: "Validation error", details: validationResult.error.message });
  } else {
    next();
  }
};

module.exports = validateContact;