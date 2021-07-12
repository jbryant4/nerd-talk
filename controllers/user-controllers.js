// GET : all and by _id
//POST: add a new user and add a new friend
//PUT: update user by _id
//Delete: user by _id and delete friend
//Bonus: if user is deleted delete their thoughts 

const { User } = require('../models')

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    }
};


module.exports = userController