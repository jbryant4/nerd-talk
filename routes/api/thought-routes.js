const router = require('express').Router();
const { getAllThoughts, createThoughts, getThoughtsById, updateThoughts, deleteThoughts, addReaction, removeReaction } = require('../../controllers/thought-controllers')


router.route('/')
    .get(getAllThoughts)
    .post(createThoughts);

router.route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);
module.exports = router;