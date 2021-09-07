const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const complaintController = require("../controllers/complaint");

router.get(
  "/getWorkerComplaint",
  isAuth,
  complaintController.getWorkerComplaint
);

router.get(
  "/getCitizenComplaint",
  isAuth,
  complaintController.getCitizenComplaint
);

module.exports = router;
