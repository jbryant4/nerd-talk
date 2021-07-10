const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const ThoughtsSchema = Schema(
    {
        thoughtText: {
            type: String,
            required: 'thought text is required',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //dont forget to add this in the utis folder JOEY!!!!!!
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        reactions:[reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thoughts = model('Thoughts', ThoughtsSchema);

model.exports = Thoughts