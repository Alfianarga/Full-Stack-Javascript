const model = require("../../models");

exports.get = function (req, res, next) {
  try {
    model.User.findAll()
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        res.json({ error: error });
      });
  } catch (error) {
    next(error);
  }
};
