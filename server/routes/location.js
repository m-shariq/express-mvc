const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const locationController = require("../controllers/location");

router.get("/city", isAuth, locationController.city);

router.get("/province", isAuth, locationController.province);

module.exports = router;
