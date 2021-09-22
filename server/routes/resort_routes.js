const roomController = require('../controllers/room.controller');
const reservationController = require('../controllers/reservation.controller');
// const userController = require('../controllers/user.controller');
const userController = require('../controllers/login.controller');

module.exports = function(app) {

//Room Table Routes
    app.get('/room/findAll', roomController.findAll);
    app.post('/room/create', roomController.create);
    app.get('/room/findOne/:id', roomController.findOne);
    app.delete('/room/deleteOne/:id', roomController.deleteOne);
    app.put('/room/updateOne/:id', roomController.updateOne);

// User Table Routes
    app.post('/register', userController.createUser);
    app.post("/login", userController.loginUser);
    app.get('/all', userController.findAll);
    app.delete("/logout", userController.logoutUser);
    app.get('/authchecker', userController.authChecker);
    app.get('/user/findOne/:id', userController.findOne);
    app.delete('/user/deleteOne/:id', userController.deleteOne);
    app.put('/user/updateOne/:id', userController.updateOne);

// Reservation Table Routes
    app.get('/reservation/findAll', reservationController.findAll);
    app.post('/reservation/create', reservationController.create);
    app.get('/reservation/findOne/:id', reservationController.findOne);
    app.delete('/reservation/deleteOne/:id', reservationController.deleteOne);
    // app.delete('/reservation/deleteOne/:resId/:roomId/:userId', reservationController.deleteOne);
    app.put('/reservation/updateOne/:id', reservationController.updateOne);
    app.get('/reservation/user', reservationController.findByUser);
}
