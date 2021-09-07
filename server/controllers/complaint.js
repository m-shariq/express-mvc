const complaintModel = require("../models/complaint");

//This is for getting record of all stations
exports.getWorkerComplaint = (req, res, next) => {
  let complaints;
  complaintModel
    .getWorkerComplaint()
    .then(([worker]) => {
      complaints = worker[0];

      res.status(200).json([complaints]);
    })
    .catch((err) => next(err));
};

exports.getCitizenComplaint = (req, res, next) => {
  let complaints;
  complaintModel
    .getCitizenComplaint()
    .then(([citizen]) => {
      complaints = citizen[0];

      res.status(200).json([complaints]);
    })
    .catch((err) => next(err));
};
