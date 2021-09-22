const express = require("express");
const app = express();
var cors = require('cors')
// const port = 8000;
const mongoUri = "mongodb://localhost/resort_db";

//Code for the session & Auth
//packages being imported for use in the app
const session = require("express-session");
//allows mongodb to be used as a session store in the express-session middleware
// const MongoDBStore = require("connect-mongodb-session")(session);
// responsible for GET POST etc routes to our server
const router = express.Router();
const mongoose = require("mongoose");

//ENV variables from config files.
const {
    PORT,
    SESS_SECRET,
    COOKIE_NAME
} = require('./config/config');

//variable that will control the expiry date of the session cookie
const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

// Connecting to Database
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("Database error", err));

// Express Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express-Session
app.use(session({
    name: COOKIE_NAME, //name to be put in "key" field in postman etc
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    //store: mongoStore,
    cookie: {
        maxAge: MAX_AGE,
        sameSite: false,
        secure: false
    }
}));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
require('./routes/resort_routes')(app);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

