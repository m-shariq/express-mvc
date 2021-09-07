const adminModel = require("../models/admin");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//------------------------------THIS IS FOR LOGGING IN USER-------------------------------//
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("jhaysjh");
  let loadedUser;
  adminModel
    .getAdmin(email)
    .then(([user]) => {
      console.log(user);
      if (user.length == 0) {
        console.log(user);
        const error = new Error("Incorrect Credentials");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user[0];
      console.log(user[0].password);
      return bcrypt.compare(password, user[0].password);
    })
    .then((isEqual) => {
      console.log("jhaysjsadash");
      if (!isEqual) {
        const error = new Error("Incorrect Credentials");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.admin_id,
        },
        "hellouhkxd",
        {
          expiresIn: "1h",
        }
      );
      console.log(loadedUser.city_name);
      res.status(200).json({
        tokens: token,
        userId: loadedUser.admin_id,
        status: loadedUser.role_id,
        email: loadedUser.email,
        name: loadedUser.admin_name,
        city: loadedUser.city_name,
      });
    })
    .catch((err) => next(err));
};

//------------------------------------THIS IS FOR CREATING NEW USER--------------------------//
exports.signupAdmin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  console.log(req);
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const address = req.body.address;
  const phone = req.body.phone;
  const province_id = req.body.province_id;
  const city_id = req.body.city_id;
  const role = req.body.role_id;
  const role_id = parseInt(role);
  const cnic = req.body.cnic;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new adminModel(
        role_id,
        name,
        email,
        address,
        phone,
        hashedPw,
        province_id,
        city_id,
        role_id,
        cnic
      );
      return user.saveAdmin();
    })
    .then((result) => {
      res.status(201).json({ message: "Admin Created" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//---------------------------THIS IS FOR CREATING NEW USER--------------------------------//
exports.signupTechnician = (req, res, next) => {
  const errors = validationResult(req);
  console.table(errors);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const address = req.body.address;
  const phone = req.body.phone;
  const province_id = req.body.province_id;
  const city_id = req.body.city_id;
  const cnic = req.body.cnic;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new adminModel(
        city_id,
        name,
        email,
        address,
        phone,
        hashedPw,
        province_id,
        city_id,
        city_id,
        cnic
      );
      return user.saveTechnician();
    })
    .then((result) => {
      res.status(201).json({ message: "Technician Created" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//---------------------------------THIS IS FOR CREATING NEW USER-----------------------------------//
exports.signupWorker = (req, res, next) => {
  const errors = validationResult(req);
  console.table(errors);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const address = req.body.address;
  const phone = req.body.phone;
  const province_id = req.body.province_id;
  const city_id = req.body.city_id;
  const cnic = req.body.cnic;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new adminModel(
        city_id,
        name,
        email,
        address,
        phone,
        hashedPw,
        province_id,
        city_id,
        city_id,
        cnic
      );
      return user.saveWorker();
    })
    .then((result) => {
      res.status(201).json({ message: "Worker Created" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//------------------------------------ADMIN LIST--------------------------------//
exports.adminList = (req, res, next) => {
  let stations;
  adminModel
    .getAdminList()
    .then(([station]) => {
      stations = station;
      console.log(stations);

      res.status(200).json(stations);
    })
    .catch((err) => next(err));
};

//------------------------------------R ADMIN LIST--------------------------------//
exports.RAdminList = (req, res, next) => {
  let stations;
  adminModel
    .getRAdminList()
    .then(([station]) => {
      stations = station;
      console.log(stations);

      res.status(200).json(stations);
    })
    .catch((err) => next(err));
};

//------------------------------------R ADMIN LIST--------------------------------//
exports.workerList = (req, res, next) => {
  let stations;
  adminModel
    .getWorkerList()
    .then(([station]) => {
      stations = station;
      console.log(stations);

      res.status(200).json(stations);
    })
    .catch((err) => next(err));
};

//------------------------------------R ADMIN LIST--------------------------------//
exports.technicianList = (req, res, next) => {
  let stations;
  adminModel
    .getTechnicianList()
    .then(([station]) => {
      stations = station;
      console.log(stations);

      res.status(200).json(stations);
    })
    .catch((err) => next(err));
};

//-----------------------------------THIS IS FOR UPDATING NEW admin------------------------------------//
exports.updateAdmin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }

  const admin_id = req.body.admin_id;
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const province_id = req.body.province_id;
  const city_id = req.body.city_id;
  const role_id = req.body.city_id;
  const cnic = req.body.cnic;
  const user = new adminModel(
    admin_id,
    name,
    email,
    address,
    phone,
    password,
    province_id,
    city_id,
    role_id,
    cnic
  );
  return user
    .updateAdmin()
    .then((result) => {
      res.status(201).json({ message: "Admin Updated" });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//-----------------------------------THIS IS FOR UPDATING NEW admin------------------------------------//
exports.updateTechnician = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }

  const admin_id = req.body.technician_id;
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const province_id = req.body.province_id;
  const city_id = req.body.city_id;
  const role_id = req.body.city_id;
  const cnic = req.body.cnic;
  const user = new adminModel(
    admin_id,
    name,
    email,
    address,
    phone,
    password,
    province_id,
    city_id,
    role_id,
    cnic
  );
  return user
    .updateTechnician()
    .then((result) => {
      res.status(201).json({ message: "Admin Updated" });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//-----------------------------------THIS IS FOR UPDATING NEW admin------------------------------------//
exports.updateWorker = (req, res, next) => {
  const errors = validationResult(req);
  //console.log(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    throw error;
  }
  console.log(req);

  const admin_id = req.body.worker_id;
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const province_id = req.body.province_id;
  const city_id = req.body.city_id;
  const role_id = req.body.city_id;
  const cnic = req.body.cnic;
  const user = new adminModel(
    admin_id,
    name,
    email,
    address,
    phone,
    password,
    province_id,
    city_id,
    role_id,
    cnic
  );
  return user
    .updateWorker()
    .then((result) => {
      res.status(201).json({ message: "Worker Updated" });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
