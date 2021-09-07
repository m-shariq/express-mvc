const locationModel = require("../models/location");
//This is for getting record of all cities
exports.city = (req, res, next) => {
  let cities;
  locationModel
    .getCity()
    .then(([city]) => {
      cities = city;
      console.log(cities);

      res.status(200).json(cities);
    })
    .catch((err) => next(err));
};

//This is for getting record of all cities
exports.province = (req, res, next) => {
  let provinces;
  locationModel
    .getProvince()
    .then(([province]) => {
      provinces = province;
      console.log(provinces);

      res.status(200).json(provinces);
    })
    .catch((err) => next(err));
};
