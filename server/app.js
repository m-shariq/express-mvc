const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const dashboardRoutes = require("./routes/dashboard");
const locationRoutes = require("./routes/location");
const manageStationRoutes = require("./routes/manage-station");
const complaintRoutes = require("./routes/complaint");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/admin", adminRoutes);

app.use("/dashboard", dashboardRoutes);

app.use("/location", locationRoutes);

app.use("/manage", manageStationRoutes);

app.use("/complaint", complaintRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).json({
    message: error.message,
  });
});

app.listen(8080);
