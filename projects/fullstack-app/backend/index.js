const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Working properly",
    time: Date.now()
  });
});

app.listen(6000);