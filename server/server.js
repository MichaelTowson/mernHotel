require("dotenv").config();

const express = require("express");
const app = express();
var cors = require("cors");

const session = require("express-session");
const router = express.Router();
const mongoose = require("mongoose");

//ENV variables from config files.
const SESS_SECRET=process.env.SESS_SECRET
const COOKIE_NAME=process.env.COOKIE_NAME
const MONGO_URI=process.env.MONGO_URI
const PORT=process.env.PORT

//variable that will control the expiry date of the session cookie
const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

// Connecting to Database
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    app.listen(PORT);
    console.log(`MongoDB connected to PORT 5000}`);
  })
  .catch((err) => console.log("Database error:", err));

// Express Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express-Session
app.use(
  session({
    name: COOKIE_NAME, //name to be put in "key" field in postman etc
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    //store: mongoStore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false,
    },
  })
);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
require("./routes/resort_routes")(app);
