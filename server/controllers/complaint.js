const complaintModel = require("../models/complaint");
const { validationResult } = require("express-validator/check");

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

exports.getResolvedWorkerComplaint = (req, res, next) => {
  let complaints;
  complaintModel
    .getResolvedWorkerComplaint()
    .then(([worker]) => {
      complaints = worker[0];

      res.status(200).json([complaints]);
    })
    .catch((err) => next(err));
};

exports.getResolvedCitizenComplaint = (req, res, next) => {
  let complaints;
  complaintModel
    .getResolvedCitizenComplaint()
    .then(([citizen]) => {
      complaints = citizen[0];

      res.status(200).json([complaints]);
    })
    .catch((err) => next(err));
};

exports.getTechnican = (req, res, next) => {
  complaintModel
    .getTechnician()
    .then(([citizen]) => {
      res.status(200).json(citizen);
    })
    .catch((err) => next(err));
};

exports.delegateTechnican = (req, res, next) => {
  const complaint_id = req.body.complaint_id;
  const technician_id = req.body.technician_id;
  complaintModel
    .delegateTechnician(technician_id, complaint_id)
    .then(([citizen]) => {
      res.status(200).json({ message: "Technician Updated" });
    })
    .catch((err) => next(err));
};
