const User = require('../models/user.model')
const bcrypt = require("bcrypt");
const { COOKIE_NAME } = require('../config/config');


module.exports.createUser = (request, response) => {
    User.create(request.body)
        .then(user => response.json(user))
        .catch(error => response.status(400).json(error))
}

module.exports.findAll = (request, response) => {
    User.find()
        .then(data => response.json(data))
        .catch(error => response.json({ error: error }))
}
module.exports.findOne = (request, response) => {
    User.findById(request.params.id)
        .then(data => response.json(data))
        .catch(error => response.json({ error: error }))
}

module.exports.deleteOne = (request, response) => {
    User.findByIdAndDelete(request.params.id)
        .then(() => response.json({ success: true }))
        .catch(error => response.status(400).json(error))
}

module.exports.updateOne = (request, response) => {
    User.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => response.json(updatedUser))
        .catch(error => response.status(400).json(error))
}

module.exports.isAuth = (req, res, next) => {
    const sessUser = req.session.user;
    if (sessUser) {
        next();
    }
    else {
        err = res.status(401).json("You Need to Be Logged in to do this. Access Denied ")
        return err;
    }
};

module.exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // basic validation
    const result = {}; //User.validate({ email, password });
    if (result.error) {
        res.status(422).json(result.error.details[0].message);
        return;
    }
    //check for existing user
    User.findOne({ email }).then((user) => {
        if (!user) return res.status(400).json("Incorrect Email");

        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.status(400).json("Incorrect Password");

            res.setHeader('Access-Control-Allow-Credentials', 'true')
            const sessionUser = { id: user.id, first_name: user.first_name, last_name: user.last_name, name: `${user.first_name} ${user.last_name}`, email: user.email };
            req.session.user = sessionUser; // Auto saves session data in mongo store
            res.json(sessionUser); // sends cookie with sessionID automatically in response
        });
    });
};

module.exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        // delete session data from store, using sessionID in cookie
        if (err) throw err;
        console.log("Cookie before" + COOKIE_NAME)
        res.clearCookie(COOKIE_NAME); // clears cookie containing expired sessionID
        console.log("Cookie after" + COOKIE_NAME)
        res.send("Logged out successfully");
    });
}

module.exports.authChecker = (req, res) => {
    const sessionUser = req.session.user;
    if (sessionUser) {
        return res.json(sessionUser);
    } else {
        return res.status(401).json({ msg: "Unauthorized" });
    }
};

