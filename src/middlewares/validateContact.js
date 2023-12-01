const HttpError = require('../helpers/httpError');

const validateContact = (schema) => (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const validationResult = schema.validate({ name, email, phone });

    if (validationResult.error) {
       const errorMessage = validationResult.error.details[0].message;
      throw new HttpError(400, errorMessage);
    }
    next();
  } catch(e) {
    next(e);
  }
};

module.exports = validateContact;