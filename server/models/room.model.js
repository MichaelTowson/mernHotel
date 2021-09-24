const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const RoomSchema = new mongoose.Schema({

    //Room also has the field of _id, which is automatically created upon generation.

    reservations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Reservation',
        required: false 
    }],

    room_number: {
        type: Number,
        unique: true,
        required: [true, "Please enter a valid room number between 1-999"],
    },
    //NOTE: Room number is the "name" for the room. This is different from the longer and more complicated _id specified above.

    type: {
        type: String,
        required: [true, "Enter what type of room this is. Options include 'single', 'double', 'triple', 'quad', 'queen', 'king', 'twin', 'double-double', 'studio', master suite', or 'mini-suite' "]
    },

    description: {
        type: String,
        required: [true, "Describe the room with additional notes that would be helpful to a customer, such as 'easy access to pool and laundry.' "]
    },

    twin_beds: {
        type: Number,
        required: [true, "Enter the number of twin beds in the room, from 0-4 "]
    },

    queen_beds: {
        type: Number,
        required: [true, "Enter the number of queen beds in the room, from 0-2 "]
    },

    king_beds: {
        type: Number,
        required: [true, "Enter the number of king beds in the room, from 0-2 "]
    },

    sofa_sleeper: {
        type: Number,
        required: [true, "Enter the number of sofa sleepers in the room, from 0-2 "]
    },

    capacity: {
        type: Number,
        required: [true, "Enter the maximum capacity for the room, from 1-8 "]
    },

    price: {
        type: Number,
        required: [true, "Enter the nightly rate for reserving the room."]
    },

    breakfast_included: {
        type: Boolean,
        required: [true, "Enter 'true' or 'false' for whether breakfast is included or not."]
    },

    wifi_included: {
        type: Boolean,
        required: [true, "Enter 'true' or 'false' for whether wifi is included or not."]
    },

    parking_included: {
        type: Boolean,
        required: [true, "Enter 'true' or 'false' for whether parking is included or not."]
    },

    smoking: {
        type: Boolean,
        required: [true, "Enter 'true' or 'false' for whether smoking is allowed in the room."]
    },

    pets: {
        type: Boolean,
        required: [true, "Enter 'true' or 'false' for whether pets are allowed in the room."]
    },
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema)

module.exports = Room;