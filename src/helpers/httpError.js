const errorList = {
  400: "Bad Request",
  404: "Not found",
}
const HttpError = (status, message = errorList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;