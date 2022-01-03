const model = require("../../models");
// exports.use = require("../../middlewares/auth");

exports.put = {
    params: ':uid',
    middlewares: require("../../middlewares/auth"),
  handler: async function (req, res, next) {
    try {
        const { name , label , picture, email, phone, website, summary } = req.body;
        console.log("TES : "+req.params.uid);
        console.log("TES 2: "+Number(req.decoded.id));
      if (Number(req.decoded.id) === Number(req.params.uid)) {
        model.User.update(
          {
            name: name,
            label: label,
            picture: picture,
            email: email,
            phone: phone,
            website: website,
            summary: summary,
          },
          {
            where: {
              id: req.params.uid,
            },
          }
        )
          .then(function (result) {
            res.json(result);
          })
          .catch(function (error) {
            res.json({ error: error });
          });
      } else {
        res.json({
          message: "Ini bukan data Anda",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
