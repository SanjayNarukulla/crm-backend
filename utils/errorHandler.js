exports.errorHandler = (res, error, status = 500) => {
  res.status(status).json({ error: error.message });
};
