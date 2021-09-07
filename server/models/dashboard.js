const db = require("../util/database");

module.exports = class admin {
  static getInfo() {
    return db.execute(
      `SELECT
      (SELECT COUNT(*) FROM worker ) as worker, 
      (SELECT COUNT(*) FROM admin) as admin,
      (SELECT COUNT(*) FROM station) as station,
      (SELECT COUNT(*) FROM technician) as technician`
    );
  }

  static getStation() {
    return db.execute(
      `SELECT station_id,station_name,longitude,latitude,location,admin_name,city_name,province_name 
      FROM station,admin,city,province 
  where  admin.admin_id=station.admin_id and station.city_id=city.city_id and station.province_id=province.province_id`
    );
  }
  static getStationInfo() {
    return db.execute(
      `SELECT * FROM station,station_info,pump,sensor 
      where station.station_id=station_info.station_id and station_info.pump_id = pump.pump_id 
      and sensor.sensor_id=station_info.sensor_id and station.station_id=?`,
      [1]
    );
  }
};
