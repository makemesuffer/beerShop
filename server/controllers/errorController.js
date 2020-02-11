const handleErrorBoundary = (error, req, res) => {
  return res.status(error.status).json({
    success: false,
    message: error.message
  });
};

module.exports = handleErrorBoundary;
