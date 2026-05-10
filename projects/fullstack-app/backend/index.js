const express = require("express");
const cors = require("cors");

const app = express();

app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    time: new Date().toISOString()
  });
});

const os = require("os");

app.get("/api/user", (req, res) => {
  res.json({
  name: "Yashodhan",
  role: "DevOps Learner",
  host: os.hostname(),
  "version": "v2",
  "deployment": "green"

});
  });

  


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(6000);