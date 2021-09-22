// const express = require("express");
// const router = express.Router();
// const { loginUser, logoutUser, authChecker } = require("../controllers/login.controller");
// const registerController = require('../controllers/login.controller');


// module.exports = function(app){
//     app.post("/login", registerController.loginUser);
//     app.get('/all', registerController.findAll);
//     app.delete("/logout", registerController.logoutUser);
//     app.get('/authchecker', registerController.authChecker);
// }


// Logs In a User, creates session in mongo store
// ad returns a cookie containing sessionID, also called "session-id"


// Log out user by deleting session from store
// and deleting cookie on client side
// Needs cookie containing sessionID to be attached to request


// Check if user is Authenticated by reading session data
// Needs cookie containing sessionID
