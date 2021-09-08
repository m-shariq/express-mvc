const db = require("../util/database");

module.exports = class complaint {
  static getWorkerComplaint() {
    return db.execute(
      `SELECT * FROM complaint,worker,technician,city,province WHERE complaint.worker_id=worker.worker_id and worker.city_id=city.city_id and worker.province_id=province.province_id or complaint.delegate_to=technician.technician_id`
    );
  }
  static getCitizenComplaint() {
    return db.execute(
      `SELECT * FROM complaint,citizen,technician,city,province WHERE complaint.citizen_id=citizen.citizen_id and citizen.city_id=city.city_id and citizen.province_id=province.province_id or complaint.delegate_to=technician.technician_id`
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
