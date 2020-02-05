const handleErrorBoundary = (error, req, res) => {
  return res.status(400).json({
    success: false,
    message: error.message
  });
};

module.exports = handleErrorBoundary;
