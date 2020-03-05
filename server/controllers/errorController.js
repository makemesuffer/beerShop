// eslint-disable-next-line no-unused-vars
const handleErrorBoundary = (error, req, res, next) => {
  return res.status(400).json({
    type: "error middleware",
    success: false,
    message: error.message
  });
};

module.exports = handleErrorBoundary;
