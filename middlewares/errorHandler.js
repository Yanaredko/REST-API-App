const errorHandler = (err, req, res, next) => {
  if (err.isJoi || err instanceof SyntaxError || err instanceof TypeError) {
   
    return res.status(400).json({ message: 'Bad Request', details: err.message });
  }
    if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
    
  return res.status(500).json({ message: 'Internal Server Error', details: err.message });
};

module.exports = errorHandler;
