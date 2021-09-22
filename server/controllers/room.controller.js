const Room = require('../models/room.model')


module.exports.findAll = (_request, response) => {
    Room.find()
        .then(data => response.json(data))
        .catch(error => response.json({error}))
}

module.exports.create = (request, response) => {
    Room.create(request.body)
        .then(data => response.json(data))
        .catch(error => response.status(400).json(error))
}

module.exports.findOne = (request, response) => {
    Room.findById(request.params.id)
        .then(data => response.json(data))
        .catch(error => response.json({error: error}))
}

module.exports.deleteOne = (request, response) => {
    Room.findByIdAndDelete(request.params.id)
        .then(() => response.json({success: true}))
        .catch(error => response.status(400).json(error))
}

module.exports.updateOne = (request, response) => {
    Room.findOneAndUpdate(
        { _id : request.params.id },
        request.body,
        {new: true, runValidators: true}
        )
        .then(updatedUser => response.json(updatedUser))
        .catch(error => response.status(400).json(error))
}