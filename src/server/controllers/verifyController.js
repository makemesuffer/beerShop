const config = require("./../config");
const db = require("../loaders/db");
const wrapAsync = require("../helpers/asyncErrorHandler");

const clientOptions = config.client_Options;

exports.verifyUser = wrapAsync(async (req, res) => {
  const userData = {
    id: req.params.id
  };

  const userUpdate = await db.Users.update({
    _id: userData.id,
    action: { available: true }
  });
  if (userUpdate) {
    res.redirect(clientOptions.url + clientOptions.emailSuccess);
  } else {
    res.json({ success: false });
  }
});
