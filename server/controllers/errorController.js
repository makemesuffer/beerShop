const handleErrorBoundary = (error, req, res) => {
  return res.status(error.status).json({
    success: false,
    message: "Incorrect password and/or login"
  });
};

module.exports = handleErrorBoundary;
