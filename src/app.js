require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const logger = require("morgan");

const session = require("express-session");
const passport = require("passport");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);

require("./config/passport");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// const app_name = require('./package.json').name;

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://funnyclass.netlify.com"]
  })
);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.locals.title = "Funny Class";


app.use(require("./routes/routes"));
app.use("/", require("./routes/auth"));

app.use((req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(process.env.PORT);
