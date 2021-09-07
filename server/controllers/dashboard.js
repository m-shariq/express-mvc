const dashboardModel = require("../models/dashboard");

//This is for getting record of all stations
exports.info = (req, res, next) => {
  let infos;
  dashboardModel
    .getInfo()
    .then(([info]) => {
      infos = info[0];

      res.status(200).json({
        station: infos.station,
        worker: infos.worker,
        technician: infos.technician,
        admin: infos.admin,
      });
    })
    .catch((err) => next(err));
};

//This is for getting record of all stations
exports.station = (req, res, next) => {
  let stations;
  dashboardModel
    .getStation()
    .then(([station]) => {
      stations = station;
      console.log(stations);

      res.status(200).json(stations);
    })
    .catch((err) => next(err));
};
