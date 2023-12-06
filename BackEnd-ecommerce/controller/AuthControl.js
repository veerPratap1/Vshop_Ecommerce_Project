const { User } = require("../models/UserModel");

const crypto = require("crypto");
const { senitizeUser, sendMail } = require("../services/commen");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY";

exports.createUser = async (req, res) => {
  if (req.file) {
    try {
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const user = new User({
            ...req.body,
            ProfileImg: req.file.path,
            password: hashedPassword,
            salt,
          });

          const doc = await user.save();
          req.login(senitizeUser(doc), (err) => {
            if (err) {
              res.status(400).json(err.message);
            } else {
              const token = jwt.sign(senitizeUser(doc), SECRET_KEY);
              res
                .cookie("jwt", token, {
                  expires: new Date(Date.now() + 3600000),
                  httpOnly: true,
                })
                .status(200)
                .json({ id: doc.id, role: doc.role });
            }
          });
        }
      );
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

exports.checkLoginUser = (req, res) => {
  const user = req.user;
  res
    .cookie("jwt", user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(200)
    .json({ id: user.id, role: user.role });
};
exports.LoginOutUser = (req, res) => {
  res
    .cookie("jwt", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};

exports.checkUser = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });

    if (user) {

      const token = crypto.randomBytes(48).toString("hex");

      user.resetPasswordToken = token;

      const doc = await user.save();

      const resetPageLink =
        "http://localhost:8000/reset-password?token=" +
        token +
        "&email=" +
        email;
      const subject = "Reset Password for E-commerce Account";
      const html = `<p>Click <a href=${resetPageLink}>click</a> to reset Passoword</p>`;
      if (email) {
        const response = await sendMail({
          to: email,
          subject,
          html,
        });
        res.json(response);
      } else {
        res.status(400);
      }
    }
  } catch (error) {
    res.json(error);
    res.status(400);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, token, password } = req.body;

  const user = await User.findOne({ email: email, resetPasswordToken: token });

  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        const subject = " Password Successfully Reset for E-commerce Account";
        const html = `<p>Password Reset successfully</p>`;
        if (email) {
          const response = await sendMail({
            to: req.body.email,
            subject: subject,
            html: html,
          });
          res.json(response);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
};
