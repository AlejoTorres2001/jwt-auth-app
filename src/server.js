require("dotenv").config();
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifiyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const crendetials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3001;
connectDB();
const app = express();

app.use(logger);
app.use(crendetials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/refresh", require("./routes/api/refresh"));
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/logout", require("./routes/api/logOut"));

app.use(verifiyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use('/users',require('./routes/api/users'));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
    return;
  }
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }
  res.type("txt").send("Not found");
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
});
