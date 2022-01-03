const express = require('express')
const router = express.Router()
// const jodoh = require("../controller/jodoh.controller.js");

const user = require("./user.router.js");

router.use("/users", user);

// router.get("/cari-jodoh", jodoh.getJodoh);

// router.post("/cari-jodoh", jodoh.setJodoh);

// router.put("/cari-jodoh", jodoh.updateJodoh);

// router.delete("/cari-jodoh", jodoh.deleteJodoh);

router.get("/about", (req, res) => {
  res.send(
    "ini rute /about " + req.query.nama + " dan umurnya " + req.query.umur
  );
});

router.get("/profile", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.send("silahkan Login terlebih dahulu");
});

module.exports = router;