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

  async send(data) {
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
          html: `Hello.<br> Success reset password for account: ${data.login}<br><br>
			        		New password: ${data.password}`
        };
        break;
      }
      case "reset-link": {
        mailOptions = {
          to: data.login,
          from: "akite.cloud@gmail.com",
          subject: `AskBrains | Reset Password`,
          html: `Hello.<br> Confirm password resetting for account: ${data.login}<br><br>
			        			<a href="${data.link}" target="_blank">Click here</a>`
        };
        break;
      }
      default: {
        console.log("something went wrong");
      }
    }

    const mailResult = await this.smtp.sendMail(mailOptions);
    console.log(mailResult);
    return mailResult;
  }
}

const mailer = new Mailer();

module.exports = mailer;
