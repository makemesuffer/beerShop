const wrapAsync = require("../helpers/asyncErrorHandler");
const db = require("../loaders/db");

exports.addBeer = wrapAsync(async (req, res) => {
  const { id, userId } = req.body;
  const data = {
    id,
    userId
  };
  try {
    await db.Users.addBeer(data);
    return res.json({
      success: true,
      message: "beer added"
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "unknown error met"
    });
  }
});

exports.deleteBeer = wrapAsync(async (req, res) => {
  const { id, userId } = req.body;
  const data = {
    id,
    userId
  };
  try {
    await db.Users.deleteBeer(data);
    return res.json({
      success: true,
      message: "beer deleted"
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "unknown error met"
    });
  }
});
