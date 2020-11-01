const express = require("express");
const dotenv = require("dotenv");

// load env vars
dotenv.config({
  path: "./config/config.env",
});

// app initializations
const app = express();

app.get("/api/v1/bootcamp", (req, res) => {
  res.status(200).json({ success: true, message: "show all bootcamps" });
});

app.get("/api/v1/bootcamp/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Get bootcamp ${req.params.id}` });
});

app.post("/api/v1/bootcamp", (req, res) => {
  res.status(200).json({ success: true, message: "Create new bootcamp" });
});

app.put("/api/v1/bootcamp/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
});

app.delete("/api/v1/bootcamp/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
});

// server stuff
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`
  );
});
