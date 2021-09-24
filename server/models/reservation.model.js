const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    
    //Reservation also has the field of _id, which is automatically created upon generation.

    //ONE-TO-MANY: A reservation is connected to a user and a room.
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please enter a specific user ID that the reservation will be placed under."]
    },

    room_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Room',
        required: [true, "Please enter a specific user ID that the reservation will be placed under."]
    },

    //We need a way to check that this is a valid date. We need to also tell the user the correct way to enter the date.
    date: {
        type: Date,
        required: [false, "Please enter today's date or a future date for the reservation."],
    },

    rsvps: {
        type: Number,
        required: [true, "Please enter the number of adult reservations."],
    },

    paid: {
        type: Boolean,
        default: false,
    },

    billing_address: {
        type: String,
        required: [true, "Please enter a valid billing address."]
    }



}, {timestamps: true});

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = Reservation;