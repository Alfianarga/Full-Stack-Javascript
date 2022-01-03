const model = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.post = (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    model.User.findOne({
      where: {
        email: email,
      },
    })
      .then(function (result) {
        let passwordHash = result.password;
        let checkPassword = bcrypt.compareSync(password, passwordHash);

        if (checkPassword) {
          res.json({
            message: "Berhasil Login",
            token: jwt.sign({ id: result.id }, "alfian-arga"),
          });
        } else {
          res.json({
            message: "Gagal Login",
          });
        }
      })
      .catch(function (error) {
        res.json({ error: error });
      });
  } catch (error) {
    next(error);
  }
};
