const manageStationModel = require("../models/manage-station");
const { validationResult } = require("express-validator/check");
//This is for getting record of all cities
exports.getStations = (req, res, next) => {
  let stations;
  manageStationModel
    .getStation()
    .then(([station]) => {
      stations = station;
      console.log(stations);

      res.status(200).json(stations);
    })
    .catch((err) => next(err));
};

exports.getWorker = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const station_id = req.body.station_id;
  let workers;
  manageStationModel
    .getWorker(station_id)
    .then(([worker]) => {
      workers = worker;
      console.log(workers);

      res.status(200).json(workers);
    })
    .catch((err) => next(err));
};

exports.getFreeWorker = (req, res, next) => {
  let workers;
  manageStationModel
    .getFreeWorker()
    .then(([worker]) => {
      workers = worker;
      console.log(workers);

      res.status(200).json(workers);
    })
    .catch((err) => next(err));
};

exports.deleteWorker = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const worker_id = req.body.worker_id;
  manageStationModel
    .deleteWorker(worker_id)
    .then(([worker]) => {
      console.log(worker);
      res.status(200).json({ message: "Worker removed" });
    })
    .catch((err) => next(err));
};

exports.getPump = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const station_id = req.body.station_id;
  manageStationModel
    .getPump(station_id)
    .then(([pump]) => {
      console.log(pump);
      res.status(200).json(pump);
    })
    .catch((err) => next(err));
};

exports.getSensor = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const pump_id = req.body.pump_id;
  manageStationModel
    .getSensor(pump_id)
    .then(([pump]) => {
      console.log(pump);
      res.status(200).json(pump);
    })
    .catch((err) => next(err));
};

exports.sensor = (req, res, next) => {
  manageStationModel
    .sensor()
    .then(([pump]) => {
      console.log(pump);
      res.status(200).json(pump);
    })
    .catch((err) => next(err));
};

exports.addSensor = (req, res, next) => {
  console.log("jajaj");
  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const pump_id = req.body.pump_id;
  const sensor_id = req.body.sensor_id;
  manageStationModel
    .addSensor(pump_id, sensor_id)
    .then(([pump]) => {
      console.log(pump);
      res.status(200).json({ message: "Sensor added" });
    })
    .catch((err) => next(err));
};
exports.addNewSensor = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const sensor_name = req.body.name;
  const sensor_detail = req.body.detail;
  manageStationModel
    .addNewSensor(sensor_name, sensor_detail)
    .then(([pump]) => {
      console.log(pump);
      res.status(200).json({ message: "Sensor added" });
    })
    .catch((err) => next(err));
};
exports.deleteSensor = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const pump_info_id = req.body.pump_info_id;
  manageStationModel
    .deleteSensor(pump_info_id)
    .then(([pump]) => {
      console.log(pump);
      res.status(200).json({ message: "Sensor deleted" });
    })
    .catch((err) => next(err));
};

exports.addWorker = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const worker_id = req.body.worker_id;
  const station_id = req.body.station_id;
  console.log(station_id);
  let workers;

  manageStationModel
    .addWorker(worker_id, station_id)
    .then(([worker]) => {
      workers = worker;
      console.log(workers);

      res.status(200).json({ message: "Worker added" });
    })
    .catch((err) => next(err));
};

//---------------------------THIS IS FOR CREATING NEW STATION--------------------------------//
exports.saveStation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const address = req.body.address;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const province_id = req.body.province_id;
  const city_id = req.body.city_id;
  const admin_id = req.body.admin_id;

  const station = new manageStationModel(
    admin_id,
    name,
    address,
    longitude,
    latitude,
    province_id,
    city_id,
    admin_id
  );
  return station
    .saveStation()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Station Created", station_id: result[0].insertId });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//---------------------------THIS IS FOR CREATING NEW STATION--------------------------------//
exports.updateStation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const address = req.body.address;
  const admin_id = req.body.admin_id;
  const station_id = req.body.station_id;

  const station = new manageStationModel(
    station_id,
    name,
    address,
    3.4,
    3.4,
    1,
    1,
    admin_id
  );
  return station
    .updateStation()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Station Updated", station_id: result[0].insertId });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//---------------------------THIS IS FOR UPDATING STATION--------------------------------//
exports.savePump = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const horsepower = req.body.horsepower;
  const warranty = req.body.warranty;
  const start_time = req.body.start_time;
  const stop_time = req.body.stop_time;
  const station_id = req.body.station_id;

  return manageStationModel
    .savePump(name, horsepower, warranty, start_time, stop_time)
    .then((result) => {
      const pump_id = result[0].insertId;
      console.log(station_id + " " + pump_id);
      return manageStationModel.saveStationInfo(station_id, pump_id);
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Station Created", pump_id: result[0].insertId });
    })
    .catch((err) => {
      if (!err.statusCode) {
        console.log(err);
        err.statusCode = 500;
      }
      next(err);
    });
};

//---------------------------THIS IS FOR UPDATING STATION--------------------------------//
exports.updatePump = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const horsepower = req.body.horsepower;
  const warranty = req.body.warranty;
  const start_time = req.body.start_time;
  const stop_time = req.body.stop_time;
  const pump_id = req.body.pump_id;

  return manageStationModel
    .updatePump(name, horsepower, warranty, start_time, stop_time, pump_id)
    .then((result) => {
      res.status(201).json({ message: "Pump Updated" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
