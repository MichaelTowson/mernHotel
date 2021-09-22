const Reservation = require('../models/reservation.model')
const User = require('../models/user.model')
const Room = require('../models/room.model')

module.exports.findAll = (_request, response) => {
    Reservation.find()
        .then(data => response.json({all_reservations: data}))
        .catch(error => response.json({error: error}))
}

module.exports.create = async (request, response) => {
    try{
        const newReservation = {
            user_id: request.body.user_id,
            room_id: request.body.room_id,
            date: request.body.date,
            adult_rsvps: request.body.adult_rsvps,
            child_rsvps: request.body.child_rsvps,
        }
        //Await queues this into a new thread.
        const reservation = await Reservation.create(newReservation)

        //Waits for the reservation to be done, because we need that data.
        await User.updateOne({_id : request.body.user_id}, {$push: {reservations: reservation._id}});

        await Room.updateOne({_id : request.body.room_id}, {$push: {reservations: reservation._id, dates_in_use: reservation.date}});

        return response.json(reservation)
    }
    catch(err){
        res.status(400).json(err);
    }
}

module.exports.deleteOne = (request, response) => {
    Reservation.findByIdAndDelete(request.params.id)
        .then(() => response.json({success: true}))
        .catch(error => response.status(400).json(error))
}
// module.exports.deleteOne = (request, response) => {
//     Reservation.findByIdAndDelete(request.params.id)
//         .then(() => response.json({success: true}))
//         .catch(error => response.status(400).json(error))
// }

module.exports.findOne = (request, response) => {
    Reservation.findById(request.params.id)
        .then(data => response.json(data))
        .catch(error => response.json({error: error}))
}

module.exports.updateOne = (request, response) => {
    Reservation.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new: true, runValidators: true}
        )
        .then(updatedUser => response.json(updatedUser))
        .catch(error => response.status(400).json(error))
}

module.exports.findByUser = async (request, response) => {
    try {
        const reservations = await Reservation.find(request.query);
        const x = await Promise.all(reservations.map(async (r) => {
            const room = await Room.findById(r.room_id);
            const { _id, adult_rsvps, child_rsvps, date } = r;
            return { _id, adult_rsvps, child_rsvps, date, room_type: room.type };
        }));
        response.json(x);
    } catch(e) {
        response.status(400).json(e);
    }
}