const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const fileupload = require("express-fileupload");
const morgan = require("morgan");

// file imports
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// load env vars
dotenv.config({
  path: "./config/config.env",
});
connectDB(); //db connection

// app initializations
const app = express();
app.use(express.json());

// dev middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// file uploads
app.use(fileupload());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

// server stuff
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow
      .bold
  );
});

// handling promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Uh Oh: ${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});
