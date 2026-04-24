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
  // simulate slow startup
  setTimeout(() => {
    res.json({ status: "ok" });
  }, 20000); // 20 sec delay
});

app.listen(6000);