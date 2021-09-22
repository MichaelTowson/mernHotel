const User = require('../models/user.model')

module.exports.findAll = (_request, response) => {
    User.find()
        .then(data => response.json({all_users: data}))
        .catch(error => response.json({error: error}))
}

module.exports.create = (request, response) => {
    User.create(request.body)
        .then(data => response.json(data))
        .catch(error => response.status(400).json(error))
}

module.exports.findOne = (request, response) => {
    User.findById(request.params.id)
        .then(data => response.json(data))
        .catch(error => response.json({error: error}))
}

module.exports.deleteOne = (request, response) => {
    User.findByIdAndDelete(request.params.id)
        .then(() => response.json({success: true}))
        .catch(error => response.status(400).json(error))
}

module.exports.updateOne = (request, response) => {
    User.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new: true, runValidators: true}
        )
        .then(updatedUser => response.json(updatedUser))
        .catch(error => response.status(400).json(error))
}

module.exports.pushOne = (request, response) => {
    User.findByIdAndUpdate( request.params.id, request.body,
        {new: true, runValidators: true}, {$push: {reservations: request}}
        )
        .then(updatedUser => response.json(updatedUser))
        .catch(error => response.status(400).json(error))
}