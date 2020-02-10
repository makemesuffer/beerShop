const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const wrapAsync = require("../helpers/asyncErrorHandler");
const config = require("../config");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
  }
};

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS,
  accessKeyId: config.AWS_ACCESS_KEY,
  region: "us-east-2"
});

const s3 = new aws.S3();

exports.deleteImage = wrapAsync(async (req, res) => {
  if (!req.body.url) {
    return res.sendStatus(400);
  }
  const { url } = req.body;

  const newKey = url.substring(url.lastIndexOf("/")).substr(1);

  const params = { Bucket: "askbrains-images", Key: newKey };

  await s3.deleteObject(params, err => {
    if (err) {
      return res.status(404).json({ error: "Delete image wrong!" });
    }
    return res.sendStatus(200);
  });
});

exports.uploadImage = () => {
  return multer({
    fileFilter,
    storage: multerS3({
      s3,
      bucket: "beershop_images",
      acl: "public-read",
      metadata: (req, file, cb) => {
        cb(null, { fieldName: "TESTING_META_DATA!" });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString());
      }
    })
  });
};
