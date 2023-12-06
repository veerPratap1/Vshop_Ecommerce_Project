const passport = require("passport");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.isAuth = () => {
  return passport.authenticate("jwt");
};

exports.senitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

//Email

 let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "vijayrana81203@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.sendMail = async ({ to, subject, text, html }) => {
  let info = await transporter.sendMail({
    from: '"E-commerce" <vijayrana81203@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return info;
};
