module.exports = {
  EXPRESS_PORT: "1337",
  url: "http://localhost:1337",
  jwtSECRET: process.env.JWT_SECRET,
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    cloudKey: process.env.CLOUD_KEY,
    cloudSecret: process.env.CLOUD_SECRET
  },
  client_Options: {
    url: "http://localhost:3000",
    emailSuccess: "search",
    socialSuccess: "login"
  }
};
