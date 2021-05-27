//Basic configuration
import nodemailer from "nodemailer";
import config from "../../private/mail.private.json";

function emailSend(correo, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email,
      pass: config.password,
    },
  });

  let mailOptions = {
    from: config.email,
    to: correo,
    subject: "Subject",
    text: text,
    html: "<h1>YUEM</h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
}

module.exports = emailSend;
