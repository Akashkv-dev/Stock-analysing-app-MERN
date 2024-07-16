const nodeMailer = require("nodemailer");
require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.getTransport = () => nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
  });

  exports.generateToken = (email,role) => {
    const expirationDate = new Date();
    expirationDate.setMinutes(new Date().getMinutes() + 5);
    return jwt.sign({ email,role, expirationDate }, process.env.JWT_SECRET_KEY);
};


exports.getMailOptions = (email, link) => {
    let body = `
    <h2>Hey ${email}</h2>
    <p>Here's the special magic link you requested:</p>
    <p>${link}</p>
    <p>Please note that for added security this link becomes invalid after 5 minutes</p>
    <p>Stay Jiggy</p>`;
  
    return {
      body,
      subject: "Urgent: Super Secret Magic Link",
      to: email,
      html: body,
      from: process.env.EMAIL_ADDRESS,
    };
  };