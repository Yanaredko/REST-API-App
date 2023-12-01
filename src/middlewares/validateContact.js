const validateContact = (schema) => (req, res, next ) => {
  try {
    const { name, email, phone } = req.body;
    const validationResult = schema.validate({ name, email, phone });

    if (validationResult.error) {
      throw new Error()
    }
  } catch(e) {
    next(e);
  }
};

module.exports = validateContact;