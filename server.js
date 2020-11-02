const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// file imports
const bootcamps = require("./routes/bootcamps");
const connectDB = require("./config/db");

// load env vars
dotenv.config({
  path: "./config/config.env",
});
connectDB(); //db connection

// app initializations
const app = express();

// dev middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

// server stuff
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`
  );
});

// handling promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Uh Oh: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
