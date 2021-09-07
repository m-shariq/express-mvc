const { body } = require("express-validator/check");

const express = require("express");

const adminController = require("../controllers/admin");

const adminModel = require("../models/admin");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

//THIS IS FOR SIGNING UP FOR Admin
router.put(
  "/signupAdmin",
  isAuth,

  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email")
      .custom((value, { req }) => {
        return adminModel.getAdmin(value).then((userDoc) => {
          if (userDoc[0].length != 0) {
            return Promise.reject("E-mail address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
    body("cnic").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("phone").trim().not().isEmpty(),
    body("province_id").trim().not().isEmpty().isNumeric(),
    body("city_id").trim().not().isEmpty().isNumeric(),
    body("role_id").trim().not().isEmpty().isNumeric(),
  ],
  adminController.signupAdmin
);

//THIS IS FOR SIGNING UP FOR Technician
router.put(
  "/signupTechnician",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email")
      .custom((value, { req }) => {
        return adminModel.getTechnician(value).then((userDoc) => {
          if (userDoc[0].length != 0) {
            return Promise.reject("E-mail address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
    body("cnic").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("phone").trim().not().isEmpty(),
    body("province_id").trim().not().isEmpty().isNumeric(),
    body("city_id").trim().not().isEmpty().isNumeric(),
  ],
  adminController.signupTechnician
);

//THIS IS FOR SIGNING UP FOR Technician
router.put(
  "/signupWorker",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email")
      .custom((value, { req }) => {
        return adminModel.getWorker(value).then((userDoc) => {
          if (userDoc[0].length != 0) {
            return Promise.reject("E-mail address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
    body("cnic").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("phone").trim().not().isEmpty(),
    body("province_id").trim().not().isEmpty().isNumeric(),
    body("city_id").trim().not().isEmpty().isNumeric(),
  ],
  adminController.signupWorker
);
//THIS IS FOR SIGNING IN FOR USER

router.post("/login", adminController.login);

router.get("/adminList", isAuth, adminController.adminList);

router.get("/RAdminList", isAuth, adminController.RAdminList);

router.get("/workerList", isAuth, adminController.workerList);

router.get("/technicianList", isAuth, adminController.technicianList);

router.put(
  "/updateAdmin",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email")
      .normalizeEmail(),
    body("name").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("cnic").trim().not().isEmpty(),
    body("phone").trim().not().isEmpty(),
    body("province_id").trim().not().isEmpty().isNumeric(),
    body("city_id").trim().not().isEmpty().isNumeric(),
  ],
  adminController.updateAdmin
);

router.put(
  "/updateTechnician",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email")
      .normalizeEmail(),
    body("name").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("cnic").trim().not().isEmpty(),
    body("phone").trim().not().isEmpty(),
    body("province_id").trim().not().isEmpty().isNumeric(),
    body("city_id").trim().not().isEmpty().isNumeric(),
  ],
  adminController.updateTechnician
);

router.put(
  "/updateWorker",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email")
      .normalizeEmail(),
    body("name").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("cnic").trim().not().isEmpty(),
    body("phone").trim().not().isEmpty(),
    body("province_id").trim().not().isEmpty().isNumeric(),
    body("city_id").trim().not().isEmpty().isNumeric(),
  ],
  adminController.updateWorker
);

module.exports = router;
