const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const complaintController = require("../controllers/complaint");

router.get("/getWorkerComplaint", complaintController.getWorkerComplaint);

router.get("/getCitizenComplaint", complaintController.getCitizenComplaint);

router.get(
  "/getResolvedWorkerComplaint",
  complaintController.getResolvedWorkerComplaint
);

router.get(
  "/getResolvedCitizenComplaint",
  complaintController.getResolvedCitizenComplaint
);

router.get("/getTechnician", isAuth, complaintController.getTechnican);

router.put(
  "/delegateTechnician",
  isAuth,
  complaintController.delegateTechnican
);

module.exports = router;
