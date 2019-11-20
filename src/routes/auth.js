const express = require("express");
const authRoutes = new express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong authenticating user"
      });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({
          message: "Session save went bad."
        });
        return;
      }

      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.get("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({
    message: "Log out success!"
  });
});

authRoutes.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({
    message: "Unauthorized"
  });
});

authRoutes.post("/adduser", (req, res, next) => {
  const { fullname, email, schoolname, role } = req.body;

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({
      message: "Provide username and password"
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      message:
        "Please make your password at least 5 characters long for security purposes."
    });
    return;
  }

  User.findOne(
    {
      username
    },
    (err, foundUser) => {
      if (err) {
        res.status(500).json({
          message: "Username check went bad."
        });
        return;
      }

      if (foundUser) {
        res.status(400).json({
          message: "Username taken. Choose another one."
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        fullname,
        email,
        schoolname,
        role,
        username: username,
        password: hashPass
      });

      newUser.save(err => {
        if (err) {
          res.status(500).json({
            message: "Saving user to database went wrong."
          });
          return;
        }

        let message = "Dados do App Funny Class";
        let content = `O seu nome de usuário na nossa aplicação é: ${username} \n e a sua senha é : 123456 \n `;
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "projetokids19@gmail.com",
            pass: process.env.PASSWORD_EMAIL
          }
        });
        transporter
          .sendMail({
            from: '"Funny Class" <projetokids19@gmail.com>',
            to: req.body.email,
            subject: message,
            text: content
          })
          .then(() => console.log("E-mail enviado"))
          .catch(error => console.log(error));

        res.status(200).json(newUser);
      });
    }
  );
});

module.exports = authRoutes;
