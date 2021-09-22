const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    //User also has the field of _id, which is automatically created upon generation.
    //Add the reservation ID to the reservation field.

    reservations: [{
        type: String,
        required: [false],
    }],

    first_name: {
        type: String,
        required: [true, "Please enter a first name"],
    },

    last_name: {
        type: String,
        required: [true, "Please enter a last name"],
    },

    cell_number: {
        type: String,
        required: [false],
    },

    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },

    admin: {
        type: Boolean,
        required: [false, "please write 'true' or 'false' whether the user is an adminstrator or not."],
    },

}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

const bcrypt = require('bcrypt');

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', UserSchema)

module.exports = User;