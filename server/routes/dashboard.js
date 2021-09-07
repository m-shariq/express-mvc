const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const dashboardController = require("../controllers/dashboard");

router.get("/info", isAuth, dashboardController.info);

router.get("/station", isAuth, dashboardController.station);

module.exports = router;
