module.exports = {
  EXPRESS_PORT: "1337",
  jwtSECRET: process.env.JWT_SECRET,
  client_Options: {
    url: "http://localhost:3000/",
    emailSuccess: "search",
    socialSuccess: "login"
  }
};
