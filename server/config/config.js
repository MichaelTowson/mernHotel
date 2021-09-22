require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    SESS_SECRET: process.env.SESS_SECRET,
    COOKIE_NAME: process.env.COOKIE_NAME,
};