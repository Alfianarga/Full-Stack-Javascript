const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var autoRoutes = require('express-auto-routes')(app); // you don't need `routes` folder any more
autoRoutes(path.join(__dirname, './controller')); // auto mounting... done!

app.listen(5001, function () {
  console.log(`Server running on http://localhost:5001`);
});

module.exports = app;