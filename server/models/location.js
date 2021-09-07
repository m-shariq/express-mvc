const db = require("../util/database");

module.exports = class location {
  static getCity() {
    return db.execute(`Select * from city order by city_name asc`);
  }
  static getProvince() {
    return db.execute(`Select * from province order by province_name asc`);
  }
};
