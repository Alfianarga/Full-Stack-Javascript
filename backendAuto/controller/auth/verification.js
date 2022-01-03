const model = require("../../models");
const jwt = require("jsonwebtoken");

exports.get = async (req, res, next) => {
  try {
    const { email, token } = req.query;
    const foundUser = await model.User.findOne({ where: { email: email } });
    if (foundUser.dataValues.isVerified) {
      return res.status(200).send(`You already activated you account!`);
    } else {
      const foundToken = jwt.verify(token, "alfian-arga");

      console.log(foundToken);
      if (foundToken) {
        // await model.User.update(
        //   { isverified: true },
        //   {
        //     where: {
        //       email: email,
        //     },
        //   }
        // )
        await model.User.update(
          {
            isVerified: true,
          },
          {
            where: {
              email: email,
            },
          }
        );

        return res
          .status(200)
          .send(`Account associated with email ${email} has been Activated!`);
      } else {
        return res.status(404).send("Token expired");
      }
    }
  } catch (err) {
    return res.status(404).send("Email not found");
  }
};
