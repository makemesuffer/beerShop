const nodemailer = require("nodemailer");

class Mailer {
  constructor() {
    this.smtp = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "vikadarova1337",
        pass: "1337pacan"
      },
      port: 465,
      secure: true
    });
  }

  send(data) {
    let mailOptions;
    switch (data.source) {
      case "email-verification": {
        mailOptions = {
          to: data.login,
          from: "vikadarova1337@gmail.com",
          subject: `Beer Shop | Email verification`,
          html: `Hello.<br> Confirm your email and activate account: ${data.login}<br><br>
			        		<a href="${data.link}" target="_blank">Click here</a>`
        };
        break;
      }
      case "password-reset": {
        mailOptions = {
          to: data.login,
          from: "vikadarova1337@gmail.com",
          subject: `Beer Shop | Reset Password`,
          html: `Hello.<br> Please, enter this code to reset your password --- <h1>${data.code}</h1>`
        };
        break;
      }
      default: {
        console.log("something went wrong");
      }
    }

    return this.smtp.sendMail(mailOptions);
  }
}

const mailer = new Mailer();

module.exports = mailer;
