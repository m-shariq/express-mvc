const express = require("express");

const { body } = require("express-validator/check");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const manageStationController = require("../controllers/mange-station");

router.get("/stations", isAuth, manageStationController.getStations);
router.post(
  "/getWorker",
  isAuth,
  [body("station_id").trim().not().isEmpty().isNumeric()],
  manageStationController.getWorker
);
router.get("/getFreeWorker", isAuth, manageStationController.getFreeWorker);
router.put(
  "/deleteWorker",
  isAuth,
  [body("worker_id").trim().not().isEmpty().isNumeric()],
  manageStationController.deleteWorker
);
router.put(
  "/addWorker",
  isAuth,
  [
    body("worker_id").trim().not().isEmpty().isNumeric(),
    body("station_id").trim().not().isEmpty().isNumeric(),
  ],
  manageStationController.addWorker
);
router.post(
  "/getPump",
  [body("station_id").trim().not().isEmpty().isNumeric()],
  manageStationController.getPump
);
router.post(
  "/getSensor",
  isAuth,
  [body("pump_id").trim().not().isEmpty().isNumeric()],
  manageStationController.getSensor
);
router.put(
  "/addSensor",
  isAuth,
  [
    body("pump_id").trim().not().isEmpty().isNumeric(),
    body("sensor_id").trim().not().isEmpty().isNumeric(),
  ],
  manageStationController.addSensor
);
router.put(
  "/deleteSensor",
  isAuth,
  [body("pump_info_id").trim().not().isEmpty().isNumeric()],
  manageStationController.deleteSensor
);
router.get("/sensor", isAuth, manageStationController.sensor);
router.put(
  "/addNewSensor",
  isAuth,
  [body("name").trim().not().isEmpty(), body("detail").trim().not().isEmpty()],
  manageStationController.addNewSensor
);

router.put(
  "/saveStation",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("longitude").trim().not().isEmpty(),
    body("latitude").trim().not().isEmpty(),
    body("province_id").trim().not().isEmpty().isNumeric(),
    body("city_id").trim().not().isEmpty().isNumeric(),
    body("admin_id").trim().not().isEmpty().isNumeric(),
  ],
  manageStationController.saveStation
);

router.put(
  "/updateStation",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("admin_id").trim().not().isEmpty().isNumeric(),
  ],
  manageStationController.updateStation
);

router.put(
  "/savePump",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("horsepower").trim().not().isEmpty(),
    body("warranty").trim().not().isEmpty(),
    body("start_time").trim().not().isEmpty(),
    body("stop_time").trim().not().isEmpty(),
  ],
  manageStationController.savePump
);

router.put(
  "/updatePump",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("horsepower").trim().not().isEmpty(),
    body("warranty").trim().not().isEmpty(),
    body("start_time").trim().not().isEmpty(),
    body("stop_time").trim().not().isEmpty(),
  ],
  manageStationController.updatePump
);

module.exports = router;
