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
  res.send("<h1>Not JSON anymore</h1>");
  
});

app.get("/health", (req, res) => {
  // simulate slow startup
  setTimeout(() => {
    res.json({ status: "ok" });
  }, 30000); // 30 sec delay
});

app.listen(6000);