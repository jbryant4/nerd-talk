
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

    //get a user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },


    //create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //update user by _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete user by _id
    deleteUser({ params }, res) {
        User.findOneAndDelete(
            { _id: params.id }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    //! for the friends part 'api/nerds/:userId/friends/:friendId
    //add a friend 
    addFriend({ params }, res) {
        //update the user friends list 
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No friend with this id!' });
                    return;
                }

                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No friend with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    }
};


module.exports = userController