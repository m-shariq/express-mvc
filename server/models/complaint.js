const db = require("../util/database");

module.exports = class complaint {
  static getWorkerComplaint() {
    return db.execute(
      `SELECT * FROM complaint,worker,city,province WHERE complaint.worker_id=worker.worker_id and worker.city_id=city.city_id and worker.province_id=province.province_id and compaint_status=? or compaint_status=?`,
      [2, 1]
    );
  }
  static getCitizenComplaint() {
    return db.execute(
      `SELECT * FROM complaint,citizen,city,province WHERE complaint.citizen_id=citizen.citizen_id and citizen.city_id=city.city_id and citizen.province_id=province.province_id and compaint_status=? or compaint_status=?`,
      [2, 1]
    );
  }

  static getResolvedWorkerComplaint() {
    return db.execute(
      `SELECT * FROM complaint,worker,city,province WHERE complaint.worker_id=worker.worker_id and worker.city_id=city.city_id and worker.province_id=province.province_id and compaint_status=?`,
      [0]
    );
  }
  static getResolvedCitizenComplaint() {
    return db.execute(
      `SELECT * FROM complaint,citizen,city,province WHERE complaint.citizen_id=citizen.citizen_id and citizen.city_id=city.city_id and citizen.province_id=province.province_id and compaint_status=?`,
      [0]
    );
  }

  static getTechnician() {
    return db.execute(`SELECT * FROM technician`);
  }
  static delegateTechnician(technician_id, complaint_id) {
    return db.execute(
      `UPDATE complaint SET compaint_status=?, delegate_to=? WHERE compaint_id=?`,
      [1, technician_id, complaint_id]
    );
  }
};
