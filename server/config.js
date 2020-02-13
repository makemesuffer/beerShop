module.exports = {
  EXPRESS_PORT: "1337",
  url: "http://localhost:1337",
  jwtSECRET: process.env.JWT_SECRET,
  cloudName: process.env.CLOUD_NAME,
  cloudAPI: process.env.CLOUD_API,
  cloudURL: process.env.CLOUD_URL,
  client_Options: {
    url: "http://localhost:3000",
    emailSuccess: "search",
    socialSuccess: "login"
  }
};
