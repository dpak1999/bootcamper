const express = require("express");
const dotenv = require("dotenv");

// route file imports
const bootcamps = require("./routes/bootcamps");

// load env vars
dotenv.config({
  path: "./config/config.env",
});

// app initializations
const app = express();

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

// server stuff
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`
  );
});
