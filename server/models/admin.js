const db = require("../util/database");

module.exports = class admin {
  constructor(
    admin_id,
    admin_name,
    email,
    address,
    phone,
    password,
    province_id,
    city_id,
    role_id,
    cnic
  ) {
    this.admin_id = admin_id;
    this.admin_name = admin_name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.password = password;
    this.province_id = province_id;
    this.city_id = city_id;
    this.role_id = role_id;
    this.cnic = cnic;
  }

  //FOR ADMIN LOGIN AND SIGNUP
  saveAdmin() {
    return db.execute(
      "INSERT INTO `admin`(`admin_name`, `email`, `address`, `phone`, `password`, `province_id`, `city_id`, `role_id`,`cnic`) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        this.admin_name,
        this.email,
        this.address,
        this.phone,
        this.password,
        this.province_id,
        this.city_id,
        this.role_id,
        this.cnic,
      ]
    );
  }
  static getAdmin(emails) {
    return db.execute(
      "SELECT * FROM `admin`,city WHERE  admin.city_id=city.city_id and `email`=?",
      [emails]
    );
  }

  //FOR TECHNICIAN LOGIN AND SIGNUP
  saveTechnician() {
    return db.execute(
      "INSERT INTO `technician`(`technician_name`, `email`, `address`, `phone`, `password`, `province_id`, `city_id`,`cnic`) VALUES (?,?,?,?,?,?,?,?)",
      [
        this.admin_name,
        this.email,
        this.address,
        this.phone,
        this.password,
        this.province_id,
        this.city_id,
        this.cnic,
      ]
    );
  }
  static getTechnician(emails) {
    return db.execute("SELECT * FROM `technician` WHERE `email`=?", [emails]);
  }

  //FOR TECHNICIAN LOGIN AND SIGNUP
  saveWorker() {
    return db.execute(
      "INSERT INTO `worker`(`worker_name`, `email`, `address`, `phone`, `password`, `province_id`, `city_id`,`cnic`) VALUES (?,?,?,?,?,?,?,?)",
      [
        this.admin_name,
        this.email,
        this.address,
        this.phone,
        this.password,
        this.province_id,
        this.city_id,
        this.cnic,
      ]
    );
  }
  static getWorker(emails) {
    return db.execute("SELECT * FROM `worker`,city WHERE  `email`=?", [emails]);
  }
  static getAdminList() {
    return db.execute(
      `Select * from admin,city,province where admin.city_id=city.city_id and admin.province_id=province.province_id and role_id=1`
    );
  }
  static getRAdminList() {
    return db.execute(
      `Select * from admin,city,province where admin.city_id=city.city_id and admin.province_id=province.province_id and role_id=0`
    );
  }
  static getWorkerList() {
    return db.execute(
      `Select * from worker,city,province where worker.city_id=city.city_id and worker.province_id=province.province_id`
    );
  }
  static getTechnicianList() {
    return db.execute(
      `Select * from technician,city,province where technician.city_id=city.city_id and technician.province_id=province.province_id`
    );
  }
  updateAdmin() {
    return db.execute(
      "UPDATE `admin` SET `admin_name`=?,`email`=?,`address`=?,`phone`=?,`province_id`=?,`city_id`=?,`cnic`=? WHERE admin_id=?",
      [
        this.admin_name,
        this.email,
        this.address,
        this.phone,
        this.province_id,
        this.city_id,
        this.cnic,
        this.admin_id,
      ]
    );
  }
  updateTechnician() {
    return db.execute(
      "UPDATE `technician` SET `technician_name`=?,`email`=?,`address`=?,`phone`=?,`province_id`=?,`city_id`=?,`cnic`=? WHERE technician_id=?",
      [
        this.admin_name,
        this.email,
        this.address,
        this.phone,
        this.province_id,
        this.city_id,
        this.cnic,
        this.admin_id,
      ]
    );
  }
  updateWorker() {
    return db.execute(
      "UPDATE `worker` SET `worker_name`=?,`email`=?,`address`=?,`phone`=?,`province_id`=?,`city_id`=?,`cnic`=? WHERE worker_id=?",
      [
        this.admin_name,
        this.email,
        this.address,
        this.phone,
        this.province_id,
        this.city_id,
        this.cnic,
        this.admin_id,
      ]
    );
  }
};
