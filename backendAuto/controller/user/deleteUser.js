const model = require("../../models");

exports.delete = {
  params: ":uid",
  middlewares: require("../../middlewares/auth"),
  handler: function (req, res, next) {
    try {
      let decodedId = req.decoded.id;

      if (Number(decodedId) === Number(req.params.uid)) {
        model.User.destroy({
          where: {
            id: req.params.uid,
          },
        })
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
