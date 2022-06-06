const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3000;
const app = express();


app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use('/',require('./routes/root'));
app.use('/register',require('./routes/api/register'));
app.use('/auth',require('./routes/api/auth'));
app.use('/employees',require('./routes/api/employees'));


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

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
