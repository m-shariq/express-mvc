const db = require("../util/database");

module.exports = class admin {
  constructor(
    station_id,
    name,
    address,
    longitude,
    latitude,
    province_id,
    city_id,
    admin_id
  ) {
    this.station_id = station_id;
    this.name = name;
    this.address = address;
    this.longitude = longitude;
    this.latitude = latitude;
    this.province_id = province_id;
    this.city_id = city_id;
    this.admin_id = admin_id;
  }

  //FOR SAVING STATION
  saveStation() {
    return db.execute(
      "INSERT INTO `station`(`station_name`, `longitude`, `latitude`, `location`, `city_id`, `province_id`, `admin_id`) VALUES (?,?,?,?,?,?,?)",
      [
        this.name,
        this.longitude,
        this.latitude,
        this.address,
        this.city_id,
        this.province_id,
        this.admin_id,
      ]
    );
  }
  //FOR UPDATING STATION
  updateStation() {
    return db.execute(
      "UPDATE `station` SET `station_name`=?, `location`=?,`admin_id`=? WHERE `station_id`=?",
      [this.name, this.address, this.admin_id, this.station_id]
    );
  }
  static getStation() {
    return db.execute(
      "SELECT * FROM station,city,province,admin WHERE station.city_id=city.city_id and station.province_id=province.province_id and station.admin_id=admin.admin_id"
    );
  }
  static getWorker(station_id) {
    return db.execute("SELECT * FROM `worker` WHERE `station_id`=?", [
      station_id,
    ]);
  }
  static getPump(station_id) {
    return db.execute(
      "SELECT * FROM pump,station_info WHERE pump.pump_id=station_info.pump_id and station_id=?",
      [station_id]
    );
  }
  static getSensor(pump_id) {
    return db.execute(
      "SELECT * FROM pump,pump_info,sensor WHERE pump.pump_id=pump_info.pump_id and pump_info.sensor_id=sensor.sensor_id and pump.pump_id=?",
      [pump_id]
    );
  }
  static sensor() {
    return db.execute("SELECT * FROM sensor");
  }

  static addSensor(pump_id, sensor_id) {
    return db.execute(
      "INSERT INTO `pump_info`( `pump_id`, `sensor_id`) VALUES (?,?)",
      [pump_id, sensor_id]
    );
  }
  static addNewSensor(sensor_name, sensor_detail) {
    return db.execute(
      "INSERT INTO `sensor`( `sensor_name`, `detail`) VALUES (?,?)",
      [sensor_name, sensor_detail]
    );
  }
  static deleteSensor(pump_info_id) {
    return db.execute("DELETE FROM `pump_info` WHERE `pump_info_id`=?", [
      pump_info_id,
    ]);
  }
  static deleteWorker(worker_id) {
    return db.execute(
      "UPDATE `worker` SET `station_id`=? WHERE `worker_id`=?",
      [null, worker_id]
    );
  }
  static addWorker(worker_id, station_id) {
    return db.execute(
      "UPDATE `worker` SET `station_id`=? WHERE `worker_id`=?",
      [station_id, worker_id]
    );
  }
  static getFreeWorker() {
    return db.execute("SELECT * FROM `worker` WHERE `station_id` is null");
  }
  static savePump(name, hp, warranty, start, stop) {
    return db.execute(
      "INSERT INTO `pump`(`pump_name`, `pump_horsepower`, `pump_warranty`, `start_time`, `stop_time`,`status`) VALUES (?,?,?,?,?,?)",
      [name, hp, warranty, start, stop, 0]
    );
  }
  static updatePump(name, hp, warranty, start, stop, pump_id) {
    return db.execute(
      "UPDATE `pump` SET `pump_name`=?,`pump_horsepower`=?,`pump_warranty`=?,`start_time`=?,`stop_time`=? WHERE `pump_id`=?",
      [name, hp, warranty, start, stop, pump_id]
    );
  }
  static saveStationInfo(station_id, pump_id) {
    return db.execute(
      "INSERT INTO `station_info`(`station_id`, `pump_id`) VALUES (?,?)",
      [station_id, pump_id]
    );
  }
};
