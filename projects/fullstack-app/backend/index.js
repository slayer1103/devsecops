const express = require("express");
const cors = require("cors");

const app = express();

app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    time: new Date().toISOString()
  });
});

app.get("/api/user", (req, res) => {
  res.json({
    name: "Yashodhan",
    role: "DevOps Learner"
  });
});

app.get("/health", (req, res) => {
  res.status(500).json({ status: "fail" });
});

app.listen(6000);