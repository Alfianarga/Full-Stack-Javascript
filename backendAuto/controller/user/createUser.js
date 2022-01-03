const model = require("../../models");
const bcrypt = require("bcryptjs");
const verificationService = require('../../services/verificationService');
const jwt = require('jsonwebtoken');

exports.post = async (req, res, next) => {
  try {
    console.log(req.body);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log("HAO");
    model.User.create({
      name: req.body.name,
      label: req.body.label,
      picture: req.body.picture,
      email: req.body.email,
      phone: req.body.phone,
      website: req.body.website,
      summary: req.body.summary,
      isverified: false,
      password: hash,
    });

    let jwtTokenEmailVerify = jwt.sign(
      { email: req.body.email },
      "alfian-arga",
      { expiresIn: "1h" }
    );

    await verificationService.sendVerificationEmail(
      req.body.email,
      jwtTokenEmailVerify
    );
    // successMessage.data = dbResponse;

    return res.status(200).send(`You have Registered Successfully, Activation link sent to: ${req.body.email}`);

  } catch (error) {
    next(error);
  }
};
