//GET: all thought and thought by _id
//Post: new thought and new reaction for a specific thought
//Put: update thought by _id
//Delete: thought by _id and reaction by reactionId
const { Thoughts, User } = require('../models')

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //get a thought by _id
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },


    //create a new thought
    createThoughts({ body }, res) {
        Thoughts.create(body)
            .then(({ _id }) =>
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
                    .then(userData => res.json(userData))
            )
            .catch(err => {
                res.json(err)
            });
    },

    //update thought by _id
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete thought by _id
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete(
            { _id: params.id }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //! for reactions /api/thoughts/:thoughtId/reactions
    //add reaction 
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    //remove a reaction
    removeReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: body } },
            { new: true}
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
}




module.exports = thoughtController